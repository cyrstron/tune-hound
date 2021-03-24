export function computePages(pageIndex: number, totalPages: number, length: number): number[] {
  const firstPage = Math.max(0, pageIndex - length);
  const lastPage = Math.min(totalPages, pageIndex + length);

  return new Array(lastPage - firstPage).fill(undefined).map((_item, index) => index + firstPage);
}
