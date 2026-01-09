import { fetchTokenByAddress } from "./dexScreener.service";
import { searchJupiterToken } from "./jupiter.service";
import { mergeTokens } from "../utils/mergeTokens";
import { Token } from "../models/token.model";
import {
  getCachedToken,
  setCachedToken
} from "../cache/token.cache";

export async function fetchAggregatedToken(
  tokenAddress: string,
  symbolHint?: string
): Promise<Token> {
    const cacheKey = `token:${tokenAddress}`;

  const cached = await getCachedToken(cacheKey);
  if (cached) {
    return cached;
  }

  const dexToken = await fetchTokenByAddress(tokenAddress);

  // Jupiter search is best-effort
  const jupiterToken = symbolHint
    ? await searchJupiterToken(symbolHint)
    : null;

  const merged = mergeTokens(dexToken, jupiterToken);

  await setCachedToken(cacheKey, merged);

  return merged;
}
