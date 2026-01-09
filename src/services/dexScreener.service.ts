import axios from "axios";
import { env } from "../config/env";
import { withRetry } from "../utils/retry";

const client = axios.create({
  baseURL: env.dexScreenerBaseUrl,
  timeout: 5000
});

export async function fetchTokenByAddress(tokenAddress: string) {
    return withRetry(async () => {
       const response = await client.get(
        `/latest/dex/tokens/${tokenAddress}`
       );
       return response.data;
    },
    3,
    500
    );
}
