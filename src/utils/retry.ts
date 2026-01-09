export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 500
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    console.warn("[retry] attempt failed, retrying...");

    await new Promise((res) => setTimeout(res, delayMs));

    return withRetry(fn, retries - 1, delayMs * 2);
  }
}
