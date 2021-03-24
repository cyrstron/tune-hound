import { SPOTIFY_PLAYER_MSG_IGNORED_KEY, SPOTIFY_AUTH_KEY } from 'consts';
import { SpotifyAdvancedSearchQuery } from '../types';

export function getSpotifyPlayerMsgState(): boolean {
  return !!localStorage.getItem(SPOTIFY_PLAYER_MSG_IGNORED_KEY);
}

export function setSpotifyPlayerMsgState(isIgnored: boolean): void {
  if (isIgnored) {
    localStorage.setItem(SPOTIFY_PLAYER_MSG_IGNORED_KEY, `${isIgnored}`);
  } else {
    localStorage.removeItem(SPOTIFY_PLAYER_MSG_IGNORED_KEY);
  }
}

export interface SpotifyAuthData {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  scope: string;
}

export function getSpotifyAuthState(): SpotifyAuthData | undefined {
  const spotifyAuthDataString = localStorage.getItem(SPOTIFY_AUTH_KEY);

  let spotifyAuthData: SpotifyAuthData | undefined;

  try {
    const parsedAuthData:
      | (Omit<SpotifyAuthData, 'expiresIn'> & {
          expiresIn: number;
        })
      | undefined = spotifyAuthDataString ? JSON.parse(spotifyAuthDataString) : undefined;

    spotifyAuthData = parsedAuthData && {
      ...parsedAuthData,
      expiresIn: new Date(parsedAuthData.expiresIn),
    };
  } catch {
    spotifyAuthData = undefined;
  }

  return spotifyAuthData;
}

export function setSpotifyAuthState(authData: SpotifyAuthData): void {
  const authDataString = JSON.stringify({
    ...authData,
    expiresIn: +authData.expiresIn,
  });

  localStorage.setItem(SPOTIFY_AUTH_KEY, authDataString);
}

export function resetSpotifyAuthState(): void {
  localStorage.removeItem(SPOTIFY_AUTH_KEY);
}

export async function mountSpotifyScript(): Promise<{
  script: HTMLScriptElement;
  spotify: typeof Spotify;
}> {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = 'https://sdk.scdn.co/spotify-player.js';

  const spotify = await new Promise<typeof Spotify>((resolve, reject) => {
    document.body.append(script);

    script.onerror = (e): void => {
      script.onerror = null;

      script.remove();
      reject(e);
    };
    window.onSpotifyWebPlaybackSDKReady = (): void => {
      resolve(window.Spotify);
    };
  });

  return { script, spotify };
}

export function getAdvancedSearchString({
  and,
  or,
  not,
  year,
  ...options
}: SpotifyAdvancedSearchQuery): string {
  let string = and.map(item => `"${item}"`).join(' ');

  if (or && or.length) {
    string += ` OR ${or.map(item => `"${item}"`).join(' ')}`;
  }

  if (not && not.length) {
    string += ` NOT ${not.map(item => `"${item}"`).join(' ')}`;
  }

  if ('track' in options && options.track) {
    string += ` track:"${options.track}"`;
  }

  if ('album' in options && options.album) {
    string += ` album:"${options.album}"`;
  }

  if ('artist' in options && options.artist) {
    string += ` artist:"${options.artist}"`;
  }

  if ('genre' in options && options.genre) {
    string += ` genre:"${options.genre}"`;
  }

  if ('tag' in options && options.tag) {
    string += ` tag:"${options.tag}"`;
  }

  if (typeof year === 'number') {
    string += ` year:${year}`;
  } else if (typeof year === 'object') {
    const { from, to } = year;

    string += ` year:${from}-${to}`;
  }

  return string;
}
