import { Token } from "../models/token.model";

export function paginateTokens(
  tokens: Token[],
  limit: number,
  cursor?: string
): { data: Token[]; nextCursor: string | null } {
  let startIndex = 0;

  if (cursor) {
    const index = tokens.findIndex(
      (t) => t.address === cursor
    );
    if (index !== -1) {
      startIndex = index + 1;
    }
  }

  const paginated = tokens.slice(
    startIndex,
    startIndex + limit
  );

  const nextCursor =
    startIndex + limit < tokens.length
      ? paginated[paginated.length - 1]?.address ?? null
      : null;

  return {
    data: paginated,
    nextCursor
  };
}
