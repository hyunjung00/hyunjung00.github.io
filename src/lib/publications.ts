export const publicationYearLabel = (year: number | null) =>
  year === null ? "Year not specified" : String(year);

export function groupPublicationsByYear<T extends { year: number | null }>(publications: T[]) {
  const groups = new Map<number | null, T[]>();
  for (const publication of publications) {
    const group = groups.get(publication.year) || [];
    group.push(publication);
    groups.set(publication.year, group);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => (b ?? -Infinity) - (a ?? -Infinity))
    .map(([year, publications]) => ({ year, label: publicationYearLabel(year), publications }));
}
