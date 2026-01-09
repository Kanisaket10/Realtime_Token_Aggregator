export interface Token {
  address: string;
  name: string;
  symbol: string;

  priceUsd: number | null;
  marketCapUsd: number | null;
  volume24hUsd: number | null;
  liquidityUsd: number | null;

  priceChange1h: number | null;
  priceChange24h: number | null;

  source: "dexscreener";
  updatedAt: number;
}
