import {
  Contract,
  Networks,
  TransactionBuilder,
  Keypair,
  Address,
  nativeToScVal,
  scValToNative,
  BASE_FEE,
  rpc,
} from '@stellar/stellar-sdk';
import { 
  StellarConfig, 
  ContractCallParams, 
  ContractCallResult, 
  STELLAR_NETWORKS,
  StellarNetworkType 
} from '@/types/stellar';

// Default configuration for Stellar testnet
const DEFAULT_CONFIG: StellarConfig = STELLAR_NETWORKS.TESTNET;

class StellarClient {
  private config: StellarConfig;
  private server: rpc.Server;
  private signer?: Keypair;

  constructor(config: StellarConfig = DEFAULT_CONFIG) {
    this.config = config;
    this.server = new rpc.Server(config.rpcUrl);
  }

  // Set the signer for transactions
  setSigner(secretKey: string): void {
    this.signer = Keypair.fromSecret(secretKey);
  }

  // Get current configuration
  getConfig(): StellarConfig {
    return this.config;
  }

  // Switch networks
  switchNetwork(networkType: StellarNetworkType): void {
    this.config = STELLAR_NETWORKS[networkType];
    this.server = new rpc.Server(this.config.rpcUrl);
  }

  // Get server instance
  getServer(): rpc.Server {
    return this.server;
  }

  // Check network health
  async getNetworkStatus() {
    try {
      const health = await this.server.getHealth();
      const ledger = await this.server.getLatestLedger();
      
      return {
        isConnected: health.status === 'healthy',
        latestLedger: ledger.sequence,
        networkPassphrase: this.config.networkPassphrase,
        rpcUrl: this.config.rpcUrl,
      };
    } catch (error) {
      return {
        isConnected: false,
        latestLedger: 0,
        networkPassphrase: this.config.networkPassphrase,
        rpcUrl: this.config.rpcUrl,
      };
    }
  }

  // Get account information
  async getAccount(publicKey: string) {
    try {
      const account = await this.server.getAccount(publicKey);
      return {
        publicKey,
        balance: account.balances.find((b: any) => b.asset_type === 'native')?.balance || '0',
        sequence: account.sequence,
        isConnected: true,
      };
    } catch (error) {
      throw new Error(`Failed to fetch account: ${error}`);
    }
  }

  // Call a contract method (read-only)
  async callContract(params: ContractCallParams): Promise<ContractCallResult> {
    try {
      const contract = new Contract(params.contractAddress);
      
      // Convert arguments to ScVal format
      const scValArgs = params.args.map(arg => {
        if (typeof arg === 'string' && arg.startsWith('G')) {
          // It's a Stellar address
          return Address.fromString(arg).toScVal();
        }
        return nativeToScVal(arg);
      });

      // Create the operation
      const operation = contract.call(params.method, ...scValArgs);

      // For read-only calls, simulate the transaction
      if (!this.signer) {
        throw new Error('Signer required for contract calls');
      }

      const account = await this.getAccount(this.signer.publicKey());
      
      const transaction = new TransactionBuilder(account as any, {
        fee: BASE_FEE,
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(operation)
        .setTimeout(30)
        .build();

      // Simulate the transaction
      const simulated = await this.server.simulateTransaction(transaction);
      
      if (rpc.Api.isSimulationError(simulated)) {
        return {
          success: false,
          error: simulated.error,
        };
      }

      // Extract the result
      const result = simulated.result?.retval;
      const nativeResult = result ? scValToNative(result) : undefined;

      return {
        success: true,
        result: nativeResult,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Submit a transaction to the network
  async submitTransaction(params: ContractCallParams): Promise<ContractCallResult> {
    try {
      if (!this.signer) {
        throw new Error('Signer required for transaction submission');
      }

      const contract = new Contract(params.contractAddress);
      
      // Convert arguments to ScVal format
      const scValArgs = params.args.map(arg => {
        if (typeof arg === 'string' && arg.startsWith('G')) {
          return Address.fromString(arg).toScVal();
        }
        return nativeToScVal(arg);
      });

      const operation = contract.call(params.method, ...scValArgs);
      const account = await this.getAccount(this.signer.publicKey());
      
      let transaction = new TransactionBuilder(account as any, {
        fee: BASE_FEE,
        networkPassphrase: this.config.networkPassphrase,
      })
        .addOperation(operation)
        .setTimeout(30)
        .build();

      // Simulate first to get the footprint
      const simulated = await this.server.simulateTransaction(transaction);
      
      if (rpc.Api.isSimulationError(simulated)) {
        return {
          success: false,
          error: simulated.error,
        };
      }

      // Prepare the transaction with simulation data
      transaction = rpc.assembleTransaction(transaction, simulated).build();
      
      // Sign the transaction
      transaction.sign(this.signer);

      // Submit the transaction
      const response = await this.server.sendTransaction(transaction);
      
      if (response.status === 'ERROR') {
        return {
          success: false,
          error: response.errorResult?.result().toString(),
        };
      }

      // Wait for confirmation
      let getResponse = await this.server.getTransaction(response.hash);
      
      while (getResponse.status === rpc.Api.GetTransactionStatus.NOT_FOUND) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        getResponse = await this.server.getTransaction(response.hash);
      }

      if (getResponse.status === rpc.Api.GetTransactionStatus.SUCCESS) {
        return {
          success: true,
          transactionHash: response.hash,
          result: getResponse.returnValue ? scValToNative(getResponse.returnValue) : undefined,
        };
      } else {
        return {
          success: false,
          error: 'Transaction failed',
          transactionHash: response.hash,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Batch contract calls for better performance
  async batchContractCalls(calls: ContractCallParams[]): Promise<ContractCallResult[]> {
    try {
      // Execute calls in parallel for read-only operations
      const results = await Promise.allSettled(
        calls.map(call => this.callContract(call))
      );

      return results.map(result => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          return {
            success: false,
            error: result.reason?.message || 'Batch call failed',
          };
        }
      });
    } catch (error) {
      // Return error for all calls if batch fails
      return calls.map(() => ({
        success: false,
        error: error instanceof Error ? error.message : 'Batch operation failed',
      }));
    }
  }

  // Get transaction details
  async getTransaction(hash: string) {
    try {
      return await this.server.getTransaction(hash);
    } catch (error) {
      throw new Error(`Failed to fetch transaction: ${error}`);
    }
  }

  // Get recent transactions for an account
  async getAccountTransactions(publicKey: string, limit: number = 10) {
    try {
      // Note: This is a simplified version. In production, you'd use Horizon API
      // for transaction history as Soroban RPC doesn't provide full transaction history
      return [];
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error}`);
    }
  }
}

// Create a singleton instance
export const stellarClient = new StellarClient();

// Export the class for custom instances
export { StellarClient };
export default stellarClient; 