import { fetchTokenByAddress } from "./dexScreener.service";
import { searchJupiterToken } from "./jupiter.service";
import { mergeTokens } from "../utils/mergeTokens";
import { Token } from "../models/token.model";

export async function fetchAggregatedToken(
  tokenAddress: string,
  symbolHint?: string
): Promise<Token> {
  const dexToken = await fetchTokenByAddress(tokenAddress);

  // Jupiter search is best-effort
  const jupiterToken = symbolHint
    ? await searchJupiterToken(symbolHint)
    : null;

  return mergeTokens(dexToken, jupiterToken);
}
