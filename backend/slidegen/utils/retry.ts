export async function retry<T>(
  fn: () => T | Promise<T>,
  test: (result: T) => boolean,
  maxTries: number = 3
) {
  let result;
  for (let i = 0; i < maxTries; i++) {
    result = await fn();
    if (test(result)) {
      return result;
    }
  }

  return result;
}
