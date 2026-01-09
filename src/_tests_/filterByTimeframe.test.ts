import { filterByTimeframe } from "../utils/filterByTimeframe";
import { Token } from "../models/token.model";

const tokens: Token[] = [
  { address: "1", priceChange1h: 1 } as Token,
  { address: "2", priceChange1h: null } as Token
];

test("filters tokens with 1h price change", () => {
  const result = filterByTimeframe(tokens, "1h");
  expect(result.length).toBe(1);
  expect(result[0].address).toBe("1");
});
