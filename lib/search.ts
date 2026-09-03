export function matchesQuery(
  values: Array<string | null | undefined>,
  needle: string,
): boolean {
  const q = needle.trim().toLowerCase();
  if (!q) return true;
  for (const v of values) {
    if (v && v.toLowerCase().includes(q)) return true;
  }
  return false;
}
