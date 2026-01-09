import express from "express";
import { fetchTokenByAddress } from "./services/dexScreener.service";
import { searchJupiterToken } from "./services/jupiter.service";
import { fetchAggregatedToken } from "./services/tokenAggregator.service";
import tokensRoute from "./routes/tokens.route";


const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/tokens", tokensRoute);

// dev-only route
app.get("/debug/token/:address", async (req, res) => {
  try {
    const data = await fetchTokenByAddress(req.params.address);
    res.json(data);
  } catch {
    res.status(500).json({ error: "failed to fetch token" });
  }
});

app.get("/debug/jupiter/:query", async (req, res) => {
  try {
    const data = await searchJupiterToken(req.params.query);
    res.json(data);
  } catch {
    res.status(500).json({ error: "failed to fetch jupiter token" });
  }
});

app.get("/debug/aggregate/:address/:symbol", async (req, res) => {
  try {
    const data = await fetchAggregatedToken(
      req.params.address,
      req.params.symbol
    );
    res.json(data);
  } catch {
    res.status(500).json({ error: "failed to aggregate token" });
  }
});

export default app;
