import { redis } from "../config/redis";
import { Token } from "../models/token.model";

const TTL_SECONDS = 30;

export async function getCachedToken(
  key: string
): Promise<Token | null> {
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}

export async function setCachedToken(
  key: string,
  token: Token
): Promise<void> {
  await redis.set(
    key,
    JSON.stringify(token),
    "EX",
    TTL_SECONDS
  );
}
