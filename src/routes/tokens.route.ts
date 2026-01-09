import { Router } from "express";

const router = Router();

// main tokens endpoint (logic added later)
router.get("/", async (_req, res) => {
  res.json({
    data: [],
    nextCursor: null
  });
});

export default router;
