# CarbonFlow - Carbon Credit Platform

CarbonFlow is a DeFi web application that enables users to trade verified carbon credits on the blockchain, providing a transparent and efficient marketplace for environmental impact.

<img width="712" alt="carbonflow-landing" src="https://github.com/user-attachments/assets/12dfc49e-ce84-4f7b-b841-8c59040df104" />

<img width="712" alt="carbonflow-transactions" src="https://github.com/user-attachments/assets/254fb183-7d67-47e9-a77f-e376812f7fab" />

## Features

- **Carbon Credit Marketplace**: Browse and purchase verified carbon credits from various environmental projects
- **Web3 Integration**: Seamless blockchain integration for secure transactions
- **Portfolio Management**: Track your carbon credit holdings and their performance
- **Real-time Analytics**: Monitor market trends and portfolio statistics
- **Transaction History**: View detailed history of purchases and retirements
- **Secure Authentication**: Email and wallet-based authentication system

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum (Web3)
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Query
- **Web3 Libraries**: wagmi, viem, ethers.js

## Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet
- Supabase account

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_USDC_ADDRESS=usdc_contract_address
VITE_CARBON_MARKET_ADDRESS=market_contract_address
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/carbonflow.git
cd carbonflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Database Setup

The application uses Supabase as its database. The schema includes:

- Carbon credits table
- User portfolios table
- Transactions table
- Watchlist table

Database migrations are located in `supabase/migrations/`.

## Project Structure

```
carbonflow/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utility libraries
│   ├── pages/         # Page components
│   ├── types/         # TypeScript types
│   └── utils/         # Helper functions
├── public/            # Static assets
└── supabase/         # Database migrations
```

## Key Features Implementation

### Web3 Integration

- Wallet connection using wagmi
- USDC token integration for purchases
- Smart contract interactions for carbon credit trading

### Authentication Flow

- Email/password authentication
- Wallet connection requirement
- Protected routes and permissions

### Carbon Credit Trading

- Browse available credits
- Purchase with USDC
- Retire credits for offset
- Transaction history tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Supabase](https://supabase.com/) for backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [wagmi](https://wagmi.sh/) for Web3 integration
- [Lucide Icons](https://lucide.dev/) for UI icons
