export function toDashedDateString(date: number | string): string {
  return new Date(date).toISOString().replace(/T.*/, "");
}
