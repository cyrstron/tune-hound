export function toQueryString(
  params: {[key: string]: string | number | undefined}
): string {
  const str = Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return str && `?${str}`;
}