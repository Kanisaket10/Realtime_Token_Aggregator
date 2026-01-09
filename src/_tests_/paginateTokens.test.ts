import { paginateTokens } from "../utils/paginateTokens";
import { Token } from "../models/token.model";

const tokens = [
  { address: "a" },
  { address: "b" },
  { address: "c" }
] as Token[];

test("paginates tokens with cursor", () => {
  const page1 = paginateTokens(tokens, 1);
  expect(page1.data[0].address).toBe("a");
  expect(page1.nextCursor).toBe("a");

  const page2 = paginateTokens(tokens, 1, page1.nextCursor!);
  expect(page2.data[0].address).toBe("b");
});
