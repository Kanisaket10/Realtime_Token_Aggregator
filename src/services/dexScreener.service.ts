import axios from "axios";
import { env } from "../config/env";

const client = axios.create({
  baseURL: env.dexScreenerBaseUrl,
  timeout: 5000
});

export async function fetchTokenByAddress(tokenAddress: string) {
  try {
    const response = await client.get(
      `/latest/dex/tokens/${tokenAddress}`
    );

    return response.data;
  } catch (error) {
    console.error("[dexScreener] fetch failed", tokenAddress);
    throw error;
  }
}
