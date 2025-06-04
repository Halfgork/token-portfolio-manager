import { stellarClient } from './client';
import { TOKEN_CONTRACTS, getAllTokenContracts, getContractBySymbol } from './contractAddresses';
import { ContractCallParams, SorobanTokenBalance } from '@/types/stellar';
import { PortfolioToken, Transaction } from '@/types/portfolio';

// Portfolio operations for multi-token management
export class PortfolioOperations {
  
  // Get balances from all token contracts for a user
  async getPortfolioBalances(userAddress: string): Promise<PortfolioToken[]> {
    try {
      const contracts = getAllTokenContracts();
      
      // Prepare batch calls for all contracts
      const balanceCalls: ContractCallParams[] = contracts.map(contract => ({
        contractAddress: contract.contractAddress,
        method: 'balance',
        args: [userAddress],
      }));

      // Execute batch calls
      const results = await stellarClient.batchContractCalls(balanceCalls);
      
      // Process results
      const portfolioTokens: PortfolioToken[] = [];
      
      for (let i = 0; i < contracts.length; i++) {
        const contract = contracts[i];
        const result = results[i];
        
        if (result.success && result.result !== undefined) {
          const balance = Number(result.result) / Math.pow(10, contract.decimals);
          
          portfolioTokens.push({
            tokenId: contract.tokenSymbol,
            symbol: contract.tokenSymbol,
            name: contract.tokenName,
            contractAddress: contract.contractAddress,
            balance,
            avgCost: 0, // This would be calculated from transaction history
            currentPrice: 0, // This would come from price feeds
            totalValue: 0, // balance * currentPrice
            totalCost: 0, // This would be calculated from transaction history
            unrealizedPnL: 0, // totalValue - totalCost
            percentageReturn: 0, // (unrealizedPnL / totalCost) * 100
            allocation: 0, // This would be calculated as percentage of total portfolio
            lastUpdated: new Date(),
          });
        }
      }
      
      return portfolioTokens;
    } catch (error) {
      console.error('Error fetching portfolio balances:', error);
      return [];
    }
  }

  // Get balance for a specific token
  async getTokenBalance(userAddress: string, tokenSymbol: string): Promise<number> {
    try {
      const contract = getContractBySymbol(tokenSymbol);
      if (!contract) {
        throw new Error(`Contract not found for token: ${tokenSymbol}`);
      }

      const result = await stellarClient.callContract({
        contractAddress: contract.contractAddress,
        method: 'balance',
        args: [userAddress],
      });

      if (result.success && result.result !== undefined) {
        return Number(result.result) / Math.pow(10, contract.decimals);
      }
      
      return 0;
    } catch (error) {
      console.error(`Error fetching balance for ${tokenSymbol}:`, error);
      return 0;
    }
  }

  // Transfer tokens between addresses
  async transferTokens(
    tokenSymbol: string,
    fromAddress: string,
    toAddress: string,
    amount: number
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      const contract = getContractBySymbol(tokenSymbol);
      if (!contract) {
        throw new Error(`Contract not found for token: ${tokenSymbol}`);
      }

      // Convert amount to contract decimals
      const contractAmount = Math.floor(amount * Math.pow(10, contract.decimals));

      const result = await stellarClient.submitTransaction({
        contractAddress: contract.contractAddress,
        method: 'transfer',
        args: [fromAddress, toAddress, contractAmount],
      });

      return {
        success: result.success,
        transactionHash: result.transactionHash,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Transfer failed',
      };
    }
  }

  // Approve spending allowance
  async approveTokens(
    tokenSymbol: string,
    ownerAddress: string,
    spenderAddress: string,
    amount: number
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      const contract = getContractBySymbol(tokenSymbol);
      if (!contract) {
        throw new Error(`Contract not found for token: ${tokenSymbol}`);
      }

      // Convert amount to contract decimals
      const contractAmount = Math.floor(amount * Math.pow(10, contract.decimals));

      const result = await stellarClient.submitTransaction({
        contractAddress: contract.contractAddress,
        method: 'approve',
        args: [ownerAddress, spenderAddress, contractAmount],
      });

      return {
        success: result.success,
        transactionHash: result.transactionHash,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Approval failed',
      };
    }
  }

  // Get allowance between addresses
  async getAllowance(
    tokenSymbol: string,
    ownerAddress: string,
    spenderAddress: string
  ): Promise<number> {
    try {
      const contract = getContractBySymbol(tokenSymbol);
      if (!contract) {
        throw new Error(`Contract not found for token: ${tokenSymbol}`);
      }

      const result = await stellarClient.callContract({
        contractAddress: contract.contractAddress,
        method: 'allowance',
        args: [ownerAddress, spenderAddress],
      });

      if (result.success && result.result !== undefined) {
        return Number(result.result) / Math.pow(10, contract.decimals);
      }
      
      return 0;
    } catch (error) {
      console.error(`Error fetching allowance for ${tokenSymbol}:`, error);
      return 0;
    }
  }

  // Get token metadata
  async getTokenMetadata(tokenSymbol: string) {
    try {
      const contract = getContractBySymbol(tokenSymbol);
      if (!contract) {
        throw new Error(`Contract not found for token: ${tokenSymbol}`);
      }

      // Prepare batch calls for metadata
      const metadataCalls: ContractCallParams[] = [
        {
          contractAddress: contract.contractAddress,
          method: 'name',
          args: [],
        },
        {
          contractAddress: contract.contractAddress,
          method: 'symbol',
          args: [],
        },
        {
          contractAddress: contract.contractAddress,
          method: 'decimals',
          args: [],
        },
      ];

      const results = await stellarClient.batchContractCalls(metadataCalls);
      
      return {
        name: results[0].success ? results[0].result : contract.tokenName,
        symbol: results[1].success ? results[1].result : contract.tokenSymbol,
        decimals: results[2].success ? Number(results[2].result) : contract.decimals,
      };
    } catch (error) {
      console.error(`Error fetching metadata for ${tokenSymbol}:`, error);
      return {
        name: '',
        symbol: '',
        decimals: 0,
      };
    }
  }

  // Calculate portfolio totals from individual token data
  calculatePortfolioTotals(tokens: PortfolioToken[]) {
    const totalValue = tokens.reduce((sum, token) => sum + token.totalValue, 0);
    const totalCost = tokens.reduce((sum, token) => sum + token.totalCost, 0);
    const totalPnL = totalValue - totalCost;
    const percentageReturn = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

    // Update allocations
    const tokensWithAllocations = tokens.map(token => ({
      ...token,
      allocation: totalValue > 0 ? (token.totalValue / totalValue) * 100 : 0,
    }));

    return {
      tokens: tokensWithAllocations,
      totalValue,
      totalCost,
      unrealizedPnL: totalPnL,
      realizedPnL: 0, // This would come from transaction history
      totalPnL,
      percentageReturn,
    };
  }

  // Batch token operations for better performance
  async batchTokenOperations(operations: ContractCallParams[]): Promise<any[]> {
    try {
      return await stellarClient.batchContractCalls(operations);
    } catch (error) {
      console.error('Error executing batch operations:', error);
      return [];
    }
  }
}

// Create singleton instance
export const portfolioOperations = new PortfolioOperations();

export default portfolioOperations; 