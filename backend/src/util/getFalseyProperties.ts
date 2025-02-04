export default function getFalsyPropertyNames<T extends object>(obj: T): string[] {
  return Object.entries(obj)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
}
