import { Router } from "express";
import { seedTokens } from "../data/seedTokens";
import { fetchAggregatedToken } from "../services/tokenAggregator.service";
import { sortTokens } from "../utils/sortTokens";
import { filterByTimeframe } from "../utils/filterByTimeframe";

const router = Router();

router.get("/", async (req, res) => {
  const results = [];

  for (const token of seedTokens) {
    try {
      const data = await fetchAggregatedToken(
        token.address,
        token.symbol
      );
      results.push(data);
    } catch {
      // skip failed token
    }
  }

  const timeframe = req.query.timeframe as
    | "1h"
    | "24h"
    | "7d"
    | undefined;

  const sortBy = req.query.sortBy as
    | "priceUsd"
    | "volume24hUsd"
    | "marketCapUsd"
    | undefined;

  const filtered = filterByTimeframe(results, timeframe);
  const sorted = sortTokens(filtered, sortBy);

  res.json({
    data: sorted,
    nextCursor: null
  });
});

export default router;