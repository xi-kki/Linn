export const alerts = [
  {
    id: 'a1',
    type: 'price' as const,
    title: 'ETH above $4,000',
    description: 'Ethereum broke your price target of $4,000',
    token: 'ETH',
    chain: 'ethereum',
    timestamp: Date.now() - 1800000,
    read: false,
  },
  {
    id: 'a2',
    type: 'whale' as const,
    title: 'Large incoming transaction',
    description: '12.5 ETH ($43,125) received from unknown wallet',
    token: 'ETH',
    chain: 'ethereum',
    timestamp: Date.now() - 7200000,
    read: false,
  },
  {
    id: 'a3',
    type: 'defi' as const,
    title: 'Aave health factor low',
    description: 'Your Aave position health factor dropped to 1.15',
    token: 'AAVE',
    chain: 'polygon',
    timestamp: Date.now() - 14400000,
    read: true,
  },
  {
    id: 'a4',
    type: 'gas' as const,
    title: 'Low gas fees',
    description: 'Ethereum gas at 8 Gwei — good time to transact',
    token: '',
    chain: 'ethereum',
    timestamp: Date.now() - 36000000,
    read: true,
  },
  {
    id: 'a5',
    type: 'price' as const,
    title: 'SOL dropped 5%+',
    description: 'Solana price fell 5.2% in the last hour',
    token: 'SOL',
    chain: 'solana',
    timestamp: Date.now() - 72000000,
    read: true,
  },
  {
    id: 'a6',
    type: 'whale' as const,
    title: 'Whale alert: 50K SOL moved',
    description: '50,000 SOL ($7.25M) transferred to Binance',
    token: 'SOL',
    chain: 'solana',
    timestamp: Date.now() - 144000000,
    read: true,
  },
]

const alertIcons = {
  price: '💰',
  whale: '🐋',
  defi: '🏦',
  gas: '⛽',
}

const alertColors = {
  price: 'text-electric-teal',
  whale: 'text-royal-purple',
  defi: 'text-flame-orange',
  gas: 'text-seafoam',
}

export { alertIcons, alertColors }
