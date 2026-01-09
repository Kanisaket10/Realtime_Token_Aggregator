import express from "express";
import { fetchTokenByAddress } from "./services/dexScreener.service";
import { searchJupiterToken } from "./services/jupiter.service";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

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



export default app;
