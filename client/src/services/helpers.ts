export function toQueryString(params: { [key: string]: string | number | undefined }): string {
  const str = Object.keys(params)
    .filter(key => params[key] !== undefined)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  return str && `?${str}`;
}

export function formatSeconds(seconds: number): string {
  seconds = Math.round(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsRemained = Math.round(seconds - hours * 3600 - minutes * 60);

  return `${hours ? `${hours}:` : ''}${minutes > 9 ? minutes : `0${minutes}`}:${
    secondsRemained > 9 ? secondsRemained : `0${secondsRemained}`
  }`;
}
