import { Server } from "socket.io";
import { seedTokens } from "../data/seedTokens";
import { fetchAggregatedToken } from "../services/tokenAggregator.service";
import {
  getLastToken,
  setLastToken
} from "./tokenState";
import { shouldEmitUpdate } from "./shouldEmitUpdate";

let started = false;

export function startTokenUpdater(io: Server) {
  if (started) return;
  started = true;
  setInterval(async () => {
    for (const token of seedTokens) {
      try {
        const latest = await fetchAggregatedToken(
          token.address,
          token.symbol
        );

        const prev = getLastToken(latest.address);

        if (shouldEmitUpdate(prev, latest)) {
          io.emit("token:update", {
            address: latest.address,
            priceUsd: latest.priceUsd,
            volume24hUsd: latest.volume24hUsd,
            updatedAt: latest.updatedAt
          });

          setLastToken(latest);
        }
      } catch {
        // skip failures silently
      }
    }
  }, 10_000); // every 10 seconds
}
