import { ContractInfo } from '@/types/stellar';

// Multiple token contract addresses for different deployed instances
// These will be populated after deploying the soroban-token-contract
// Contract source: contracts/soroban-token-contract (cloned from https://github.com/Halfgork/soroban-token-contract)
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

// Contract deployment instructions using the cloned repository
export const DEPLOYMENT_INSTRUCTIONS = `
To deploy token contracts using the cloned repository:

1. Navigate to the contract directory:
   cd contracts/soroban-token-contract

2. Build the contract:
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

Available contract methods from the Soroban Token Contract:
- initialize(admin, decimal, name, symbol)
- mint(to, amount) [admin only]
- set_admin(new_admin) [admin only]
- freeze_account(account) [admin only]
- unfreeze_account(account) [admin only]
- transfer(from, to, amount)
- transfer_from(spender, from, to, amount)
- approve(from, spender, amount, expiration_ledger)
- burn(from, amount)
- burn_from(spender, from, amount)
- balance(id)
- allowance(from, spender)
- decimals()
- name()
- symbol()

Note: Replace YOUR_SECRET_KEY and YOUR_PUBLIC_KEY with actual values.
Replace CONTRACT_ADDRESS with the deployed contract address from step 3.

The contract source code is available at: contracts/soroban-token-contract/
Repository: https://github.com/Halfgork/soroban-token-contract
`;

export default TOKEN_CONTRACTS; 