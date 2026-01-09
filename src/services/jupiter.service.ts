import axios from "axios";
import { env } from "../config/env";
import { withRetry } from "../utils/retry";
import { normalizeJupiterToken } from "../normalizers/jupiter.normalizer";
import { Token } from "../models/token.model";

const client = axios.create({
  baseURL: env.jupiterBaseUrl,
  timeout: 5000
});

// Jupiter works more like a search API
export async function searchJupiterToken(
  query: string
): Promise<Token | null> {
  return withRetry(async () => {
    const response = await client.get(
      `/tokens/v2/search`,
      { params: { query } }
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return normalizeJupiterToken(response.data[0]);
  });
}
