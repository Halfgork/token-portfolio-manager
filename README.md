# Multi-Token Portfolio Manager

A professional-grade portfolio management platform for Stellar token assets with real-time analytics, multi-contract integration, and advanced risk management tools.

## 🌟 Features

- **Multi-Token Portfolio Management**: Unified dashboard for managing multiple Stellar token contracts
- **Real-time Analytics**: Live portfolio tracking with P&L calculations and performance metrics
- **Soroban Smart Contract Integration**: Native integration with Stellar Soroban contracts (no WASM files in frontend)
- **Professional Financial UI**: Dark theme with financial dashboard styling and monospace fonts for numbers
- **Advanced Portfolio Analytics**: Asset allocation, risk metrics, and performance comparisons
- **Batch Operations**: Efficient multi-contract operations for better performance
- **Wallet Integration**: Support for Freighter wallet and development with secret keys

## 🏗️ Architecture

### Frontend Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling with custom financial theme
- **Zustand** for state management
- **React Query** for data fetching (ready for integration)
- **Lucide React** for icons
- **Recharts** for charts (ready for integration)

### Blockchain Integration
- **Stellar SDK** for blockchain interactions
- **Soroban Smart Contracts** for token management
- **Multi-contract architecture** for different token types
- **No WASM files** in frontend (contracts deployed separately)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- Stellar Testnet account (for development)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd token-portfolio-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Smart Contract Setup

The frontend interacts with deployed Soroban token contracts. Follow these steps to deploy contracts:

### 1. Clone the Token Contract Repository
```bash
git clone https://github.com/Halfgork/soroban-token-contract
cd soroban-token-contract
```

### 2. Build the Contract
```bash
soroban contract build
```

### 3. Deploy Multiple Token Instances
Deploy separate instances for different tokens (USDC, BTC, ETH, etc.):

```bash
# Deploy contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm \
  --source-account YOUR_SECRET_KEY \
  --network testnet

# Initialize with token metadata
soroban contract invoke \
  --id CONTRACT_ADDRESS \
  --source-account YOUR_SECRET_KEY \
  --network testnet \
  -- initialize \
  --admin YOUR_PUBLIC_KEY \
  --decimal 6 \
  --name "USD Coin" \
  --symbol "USDC"
```

### 4. Update Contract Addresses
Update the contract addresses in `/src/lib/stellar/contractAddresses.ts`:

```typescript
export const TOKEN_CONTRACTS: Record<string, ContractInfo> = {
  USDC: {
    contractAddress: 'YOUR_DEPLOYED_USDC_CONTRACT_ADDRESS',
    tokenSymbol: 'USDC',
    tokenName: 'USD Coin',
    decimals: 6,
  },
  // Add other tokens...
};
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any additional configuration:

```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org
```

### Wallet Connection
The app supports two connection methods:

1. **Freighter Wallet** (recommended for production)
   - Install [Freighter](https://freighter.app/)
   - Click "Connect Freighter Wallet"

2. **Secret Key** (development only)
   - Click "Use Secret Key (Development)"
   - Enter your Stellar secret key (starts with 'S')

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Portfolio dashboard
│   ├── tokens/            # Token management pages
│   ├── analytics/         # Advanced analytics
│   ├── transactions/      # Transaction history
│   ├── settings/          # Portfolio settings
│   └── reports/           # Export and reports
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── portfolio/        # Portfolio-specific components
│   ├── analytics/        # Analytics components
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── lib/                  # Core libraries
│   ├── stellar/          # Stellar/Soroban integration
│   ├── calculations.ts   # Portfolio calculations
│   ├── exports.ts        # Export functionality
│   └── utils.ts          # Utility functions
├── stores/               # Zustand state stores
│   ├── walletStore.ts    # Wallet connection state
│   ├── portfolioStore.ts # Portfolio data state
│   ├── tokenStore.ts     # Token management state
│   └── priceStore.ts     # Price data state
└── types/                # TypeScript type definitions
    ├── portfolio.ts      # Portfolio types
    ├── token.ts          # Token types
    ├── stellar.ts        # Stellar SDK types
    └── analytics.ts      # Analytics types
```

## 🎨 Design System

### Colors
- **Primary**: #3B82F6 (blue) - main actions and highlights
- **Secondary**: #6B7280 (gray) - secondary elements
- **Success**: #059669 (green) - positive values and gains
- **Danger**: #DC2626 (red) - negative values and losses
- **Background**: #111827 (dark) - main background
- **Cards**: #1F2937 (dark gray) - card backgrounds

### Typography
- **Numbers**: JetBrains Mono (monospace) for consistent alignment
- **UI Text**: Inter for readability
- **Financial Metrics**: Large, bold formatting with color coding

## 🔗 API Integration

The portfolio manager is designed to work with:

- **Soroban RPC**: For smart contract interactions
- **Price Feeds**: Ready for integration with price data providers
- **Transaction History**: Via Stellar Horizon API
- **Portfolio Analytics**: Custom calculation engine

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier for code formatting (configure as needed)
- Conventional commits encouraged

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔐 Security Considerations

- **No Private Keys in Frontend**: All sensitive operations use wallet connections
- **Read-only by Default**: Contract calls are simulated before submission
- **Testnet First**: Always test on Stellar Testnet before mainnet
- **HTTPS Required**: For wallet connections in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🆘 Support

For questions and support:
- Check the GitHub Issues
- Review the Stellar documentation
- Join the Stellar Discord community

## 🗺️ Roadmap

- [ ] Real-time price feed integration
- [ ] Advanced charting with Recharts
- [ ] Portfolio rebalancing recommendations
- [ ] Export functionality (CSV, PDF)
- [ ] Mobile responsive design
- [ ] Multiple portfolio support
- [ ] DeFi protocol integrations
- [ ] Tax reporting features

---

Built with ❤️ for the Stellar ecosystem
