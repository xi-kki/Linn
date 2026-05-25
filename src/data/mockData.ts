export interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  chain: ChainId;
  balance: number;
  price: number;
  valueUsd: number;
  change24h: number;
}

export interface Chain {
  id: ChainId;
  name: string;
  logo: string;
  color: string;
  balanceUsd: number;
  percentage: number;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  chain: ChainId;
  tokenA: string;
  tokenB?: string;
  amountA: number;
  amountB?: number;
  usdValue: number;
  from: string;
  to: string;
  timestamp: number;
  status: 'confirmed' | 'pending' | 'failed';
}

export interface Nft {
  id: string;
  name: string;
  collection: string;
  chain: ChainId;
  image: string;
  floorPrice: number;
  lastPrice?: number;
}

export type ChainId = 'ethereum' | 'solana' | 'polygon' | 'arbitrum' | 'base' | 'sui';

export const chains: Record<ChainId, { name: string; color: string; logo: string }> = {
  ethereum: { name: 'Ethereum', color: '#627EEA', logo: '⟠' },
  solana: { name: 'Solana', color: '#00D18C', logo: '◎' },
  polygon: { name: 'Polygon', color: '#8247E5', logo: '⬡' },
  arbitrum: { name: 'Arbitrum', color: '#2D374B', logo: '⟡' },
  base: { name: 'Base', color: '#0052FF', logo: '◈' },
  sui: { name: 'Sui', color: '#4DA2FF', logo: '◉' },
};

export const chainDistribution: Chain[] = [
  { id: 'ethereum', name: 'Ethereum', logo: '⟠', color: '#627EEA', balanceUsd: 45230, percentage: 38 },
  { id: 'solana', name: 'Solana', logo: '◎', color: '#00D18C', balanceUsd: 28500, percentage: 24 },
  { id: 'polygon', name: 'Polygon', logo: '⬡', color: '#8247E5', balanceUsd: 15400, percentage: 13 },
  { id: 'arbitrum', name: 'Arbitrum', logo: '⟡', color: '#2D374B', balanceUsd: 12300, percentage: 10 },
  { id: 'base', name: 'Base', logo: '◈', color: '#0052FF', balanceUsd: 9800, percentage: 8 },
  { id: 'sui', name: 'Sui', logo: '◉', color: '#4DA2FF', balanceUsd: 8500, percentage: 7 },
];

export const tokens: Token[] = [
  { id: '1', name: 'Ethereum', symbol: 'ETH', logo: '⟠', chain: 'ethereum', balance: 12.5, price: 3450, valueUsd: 43125, change24h: 2.4 },
  { id: '2', name: 'USDC', symbol: 'USDC', logo: '○', chain: 'ethereum', balance: 15000, price: 1, valueUsd: 15000, change24h: 0.01 },
  { id: '3', name: 'Solana', symbol: 'SOL', logo: '◎', chain: 'solana', balance: 185, price: 145, valueUsd: 26825, change24h: -1.2 },
  { id: '4', name: 'MATIC', symbol: 'MATIC', logo: '⬡', chain: 'polygon', balance: 8500, price: 0.72, valueUsd: 6120, change24h: 5.8 },
  { id: '5', name: 'Arbitrum', symbol: 'ARB', logo: '⟡', chain: 'arbitrum', balance: 4200, price: 1.85, valueUsd: 7770, change24h: -3.4 },
  { id: '6', name: 'Chainlink', symbol: 'LINK', logo: '⬡', chain: 'ethereum', balance: 320, price: 14.5, valueUsd: 4640, change24h: 1.6 },
  { id: '7', name: 'Uniswap', symbol: 'UNI', logo: '🦄', chain: 'arbitrum', balance: 850, price: 7.2, valueUsd: 6120, change24h: 0.8 },
  { id: '8', name: 'Aave', symbol: 'AAVE', logo: '⬡', chain: 'polygon', balance: 45, price: 95, valueUsd: 4275, change24h: -2.1 },
  { id: '9', name: 'SUI', symbol: 'SUI', logo: '◉', chain: 'sui', balance: 3200, price: 2.15, valueUsd: 6880, change24h: 12.4 },
  { id: '10', name: 'Jupiter', symbol: 'JUP', logo: '◎', chain: 'solana', balance: 1500, price: 1.05, valueUsd: 1575, change24h: 7.3 },
];

export const transactions: Transaction[] = [
  { id: 't1', type: 'receive', chain: 'ethereum', tokenA: 'ETH', amountA: 0.5, usdValue: 1725, from: '0x742d...4a29', to: '0x8f3E...7b21', timestamp: Date.now() - 3600000, status: 'confirmed' },
  { id: 't2', type: 'swap', chain: 'solana', tokenA: 'SOL', tokenB: 'USDC', amountA: 10, amountB: 1450, usdValue: 1450, from: '0x3f5c...9d11', to: '0x8f3E...7b21', timestamp: Date.now() - 7200000, status: 'confirmed' },
  { id: 't3', type: 'send', chain: 'polygon', tokenA: 'MATIC', amountA: 500, usdValue: 360, from: '0x8f3E...7b21', to: '0x1a2b...3c4d', timestamp: Date.now() - 14400000, status: 'confirmed' },
  { id: 't4', type: 'receive', chain: 'arbitrum', tokenA: 'ARB', amountA: 1000, usdValue: 1850, from: '0x5d6e...7f8g', to: '0x8f3E...7b21', timestamp: Date.now() - 28800000, status: 'confirmed' },
  { id: 't5', type: 'swap', chain: 'ethereum', tokenA: 'ETH', tokenB: 'UNI', amountA: 0.1, amountB: 48, usdValue: 345, from: '0x8f3E...7b21', to: '0x9h0i...1j2k', timestamp: Date.now() - 57600000, status: 'confirmed' },
  { id: 't6', type: 'receive', chain: 'sui', tokenA: 'SUI', amountA: 500, usdValue: 1075, from: '0x3l4m...5n6o', to: '0x8f3E...7b21', timestamp: Date.now() - 86400000, status: 'confirmed' },
  { id: 't7', type: 'send', chain: 'base', tokenA: 'ETH', amountA: 0.05, usdValue: 172, from: '0x8f3E...7b21', to: '0x7p8q...9r0s', timestamp: Date.now() - 172800000, status: 'confirmed' },
  { id: 't8', type: 'swap', chain: 'solana', tokenA: 'USDC', tokenB: 'JUP', amountA: 500, amountB: 476, usdValue: 500, from: '0x8f3E...7b21', to: '0x1t2u...3v4w', timestamp: Date.now() - 259200000, status: 'confirmed' },
];

export const nfts: Nft[] = [
  { id: 'n1', name: 'Bored Ape #8874', collection: 'Bored Ape Yacht Club', chain: 'ethereum', image: 'https://picsum.photos/seed/nft1/400/400', floorPrice: 32.5, lastPrice: 35 },
  { id: 'n2', name: 'Pudgy Penguin #2910', collection: 'Pudgy Penguins', chain: 'ethereum', image: 'https://picsum.photos/seed/nft2/400/400', floorPrice: 8.2, lastPrice: 7.5 },
  { id: 'n3', name: 'Mad Lads #445', collection: 'Mad Lads', chain: 'solana', image: 'https://picsum.photos/seed/nft3/400/400', floorPrice: 125, lastPrice: 130 },
  { id: 'n4', name: 'DeGod #3301', collection: 'DeGods', chain: 'solana', image: 'https://picsum.photos/seed/nft4/400/400', floorPrice: 3.4, lastPrice: 3.2 },
  { id: 'n5', name: 'CryptoSkull #774', collection: 'CryptoSkulls', chain: 'polygon', image: 'https://picsum.photos/seed/nft5/400/400', floorPrice: 0.8, lastPrice: 0.9 },
  { id: 'n6', name: 'Azuki #8812', collection: 'Azuki', chain: 'ethereum', image: 'https://picsum.photos/seed/nft6/400/400', floorPrice: 5.8, lastPrice: 6.1 },
  { id: 'n7', name: 'Tensorian #701', collection: 'Tensorians', chain: 'solana', image: 'https://picsum.photos/seed/nft7/400/400', floorPrice: 220, lastPrice: 215 },
  { id: 'n8', name: 'SuiFren #1228', collection: 'SuiFrens', chain: 'sui', image: 'https://picsum.photos/seed/nft8/400/400', floorPrice: 95, lastPrice: 100 },
];

export const portfolioHistory = [
  { date: 'May 1', value: 118000 },
  { date: 'May 2', value: 121000 },
  { date: 'May 3', value: 117500 },
  { date: 'May 4', value: 119800 },
  { date: 'May 5', value: 124000 },
  { date: 'May 6', value: 122500 },
  { date: 'May 7', value: 126000 },
  { date: 'May 8', value: 128300 },
  { date: 'May 9', value: 125500 },
  { date: 'May 10', value: 129800 },
  { date: 'May 11', value: 132000 },
  { date: 'May 12', value: 128500 },
  { date: 'May 13', value: 131200 },
  { date: 'May 14', value: 135000 },
  { date: 'May 15', value: 133800 },
  { date: 'May 16', value: 138500 },
  { date: 'May 17', value: 136000 },
  { date: 'May 18', value: 141200 },
  { date: 'May 19', value: 139500 },
  { date: 'May 20', value: 142800 },
  { date: 'May 21', value: 145000 },
  { date: 'May 22', value: 143200 },
  { date: 'May 23', value: 147500 },
  { date: 'May 24', value: 145800 },
  { date: 'May 25', value: 149250 },
];

export const totalNetWorth = 119500;
export const change24h = 3450;
export const change24hPercent = 2.97;
