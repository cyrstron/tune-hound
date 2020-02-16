export function toQueryString(
  params: {[key: string]: string | number | undefined}
): string {
  const str = Object.keys(params)
    .map((key) => params[key] !== undefined && `${key}=${params[key]}`)
    .join('&');

  return str && `?${str}`;
}