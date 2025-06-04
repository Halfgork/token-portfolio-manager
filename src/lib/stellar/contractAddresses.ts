import { ContractInfo } from '@/types/stellar';

// Multiple token contract addresses for different deployed instances
// These will be populated after deploying the soroban-token-contract
export const TOKEN_CONTRACTS: Record<string, ContractInfo> = {
  USDC: {
    contractAddress: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', // Replace with actual deployed address
    tokenSymbol: 'USDC',
    tokenName: 'USD Coin',
    decimals: 6,
  },
  BTC: {
    contractAddress: 'CBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', // Replace with actual deployed address
    tokenSymbol: 'BTC',
    tokenName: 'Bitcoin',
    decimals: 8,
  },
  ETH: {
    contractAddress: 'CEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', // Replace with actual deployed address
    tokenSymbol: 'ETH',
    tokenName: 'Ethereum',
    decimals: 18,
  },
  XLM: {
    contractAddress: 'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Replace with actual deployed address
    tokenSymbol: 'XLM',
    tokenName: 'Stellar Lumens',
    decimals: 7,
  },
  SOL: {
    contractAddress: 'CSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', // Replace with actual deployed address
    tokenSymbol: 'SOL',
    tokenName: 'Solana',
    decimals: 9,
  },
};

// Get all available token contracts
export const getAllTokenContracts = (): ContractInfo[] => {
  return Object.values(TOKEN_CONTRACTS);
};

// Get contract info by symbol
export const getContractBySymbol = (symbol: string): ContractInfo | undefined => {
  return TOKEN_CONTRACTS[symbol.toUpperCase()];
};

// Get contract info by address
export const getContractByAddress = (address: string): ContractInfo | undefined => {
  return Object.values(TOKEN_CONTRACTS).find(contract => 
    contract.contractAddress === address
  );
};

// Add new token contract (for dynamic additions)
export const addTokenContract = (symbol: string, contractInfo: ContractInfo): void => {
  TOKEN_CONTRACTS[symbol.toUpperCase()] = contractInfo;
};

// Validate contract address format
export const isValidContractAddress = (address: string): boolean => {
  // Stellar contract addresses are 56 characters starting with 'C'
  return /^C[A-Z0-9]{55}$/.test(address);
};

// Contract deployment instructions
export const DEPLOYMENT_INSTRUCTIONS = `
To deploy token contracts:

1. Clone the soroban-token-contract repository:
   git clone https://github.com/Halfgork/soroban-token-contract

2. Build the contract:
   cd soroban-token-contract
   soroban contract build

3. Deploy multiple instances for different tokens:
   soroban contract deploy \\
     --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm \\
     --source-account YOUR_SECRET_KEY \\
     --network testnet

4. Initialize each contract with token metadata:
   soroban contract invoke \\
     --id CONTRACT_ADDRESS \\
     --source-account YOUR_SECRET_KEY \\
     --network testnet \\
     -- initialize \\
     --admin YOUR_PUBLIC_KEY \\
     --decimal 6 \\
     --name "USD Coin" \\
     --symbol "USDC"

5. Update the contract addresses in this file with the deployed addresses.

Note: Replace YOUR_SECRET_KEY and YOUR_PUBLIC_KEY with actual values.
Replace CONTRACT_ADDRESS with the deployed contract address from step 3.
`;

export default TOKEN_CONTRACTS; 