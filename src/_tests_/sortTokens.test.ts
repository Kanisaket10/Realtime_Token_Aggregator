import { sortTokens } from "../utils/sortTokens";
import { Token } from "../models/token.model";

const tokens: Token[] = [
  { address: "1", symbol: "A", priceUsd: 10 } as Token,
  { address: "2", symbol: "B", priceUsd: 20 } as Token,
  { address: "3", symbol: "C", priceUsd: null } as Token
];

test("sorts tokens by priceUsd descending", () => {
  const result = sortTokens(tokens, "priceUsd");
  expect(result[0].priceUsd).toBe(20);
  expect(result[1].priceUsd).toBe(10);
});
