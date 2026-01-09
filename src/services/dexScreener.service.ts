import axios from "axios";
import { env } from "../config/env";
import { withRetry } from "../utils/retry";
import { normalizeDexScreenerToken } from "../normalizers/dexScreener.normalizer";
import { Token } from "../models/token.model";

const client = axios.create({
  baseURL: env.dexScreenerBaseUrl,
  timeout: 5000
});

export async function fetchTokenByAddress(
  tokenAddress: string
): Promise<Token> {
  return withRetry(async () => {
    const response = await client.get(
      `/latest/dex/tokens/${tokenAddress}`
    );

    return normalizeDexScreenerToken(response.data);
  });
}
