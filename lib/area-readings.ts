import itoshima from "@/data/area-readings/itoshima.json";

// Add verified municipality datasets here; facility CSV values remain unchanged.
const municipalityReadings: Record<string, Readonly<Record<string, string>>> = {
  [itoshima.city]: itoshima.readings,
};
const kanaOrder = new Intl.Collator("ja", { usage: "sort", sensitivity: "variant" });

export function getAreaReadings(city: string): Readonly<Record<string, string>> {
  return municipalityReadings[city] ?? {};
}

export function sortAreasByReading(
  areas: readonly string[],
  readings: Readonly<Record<string, string>>,
): string[] {
  return [...areas].sort((a, b) => {
    const readingA = readings[a];
    const readingB = readings[b];
    // Unknown areas keep their original order after verified areas.
    if (!readingA || !readingB) return readingA ? -1 : readingB ? 1 : 0;
    // Same-reading ties use the exact area key, independent of CSV row order.
    return kanaOrder.compare(readingA, readingB) || (a < b ? -1 : a > b ? 1 : 0);
  });
}
