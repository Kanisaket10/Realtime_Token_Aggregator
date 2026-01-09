import { Token } from "../models/token.model";

export function shouldEmitUpdate(
  prev: Token | undefined,
  next: Token
): boolean {
  if (!prev) return true;

  if (
    prev.priceUsd &&
    next.priceUsd &&
    Math.abs(
      (next.priceUsd - prev.priceUsd) / prev.priceUsd
    ) >= 0.005
  ) {
    return true;
  }

  if (
    prev.volume24hUsd &&
    next.volume24hUsd &&
    Math.abs(
      (next.volume24hUsd - prev.volume24hUsd) /
        prev.volume24hUsd
    ) >= 0.05
  ) {
    return true;
  }

  return false;
}
