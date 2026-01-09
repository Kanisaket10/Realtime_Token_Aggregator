import { Router } from "express";
import { seedTokens } from "../data/seedTokens";
import { fetchAggregatedToken } from "../services/tokenAggregator.service";

const router = Router();

router.get("/", async (_req, res) => {
  const results = [];

  for (const token of seedTokens) {
    try {
      const data = await fetchAggregatedToken(
        token.address,
        token.symbol
      );
      results.push(data);
    } catch {
      // skip failed token silently for now
    }
  }

  res.json({
    data: results,
    nextCursor: null
  });
});

export default router;

