import { Token } from "../models/token.model";

type Timeframe = "1h" | "24h" | "7d";

export function filterByTimeframe(
  tokens: Token[],
  timeframe?: Timeframe
): Token[] {
  if (!timeframe) {
    return tokens;
  }

  switch (timeframe) {
    case "1h":
      return tokens.filter(
        (t) => t.priceChange1h !== null
      );

    case "24h":
      return tokens.filter(
        (t) => t.priceChange24h !== null
      );

    case "7d":
      // We don’t currently have 7d data
      // Return tokens as-is 
      return tokens;

    default:
      return tokens;
  }
}
