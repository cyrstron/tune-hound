import {
  SPOTIFY_PLAYER_MSG_IGNORED_KEY, 
  SPOTIFY_AUTH_KEY 
} from "consts";

export function getSpotifyPlayerMsgState(): boolean {
  return !!localStorage.getItem(SPOTIFY_PLAYER_MSG_IGNORED_KEY);
}

export function setSpotifyPlayerMsgState(isIgnored: boolean) {
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

export function getSpotifyAuthState() {
  const spotifyAuthDataString = localStorage.getItem(SPOTIFY_AUTH_KEY);

  let spotifyAuthData: SpotifyAuthData | undefined;

  try {
    const parsedAuthData: Omit<SpotifyAuthData, 'expiresIn'> & { 
      expiresIn: number,
    } | undefined = spotifyAuthDataString ? JSON.parse(spotifyAuthDataString) : undefined;

    spotifyAuthData = parsedAuthData && {
      ...parsedAuthData,
      expiresIn: new Date(parsedAuthData.expiresIn),
    };
  } catch {}

  return spotifyAuthData
}

export function setSpotifyAuthState(authData: SpotifyAuthData) {
  const authDataString = JSON.stringify({
    ...authData,
    expiresIn: +authData.expiresIn,
  });

  localStorage.setItem(SPOTIFY_AUTH_KEY, authDataString);
}

export function resetSpotifyAuthState() {
  localStorage.removeItem(SPOTIFY_AUTH_KEY);
}


export async function mountSpotifyScript(): Promise<{
  script: HTMLScriptElement,
  spotify: typeof Spotify,
}> {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = 'https://sdk.scdn.co/spotify-player.js';

  const spotify = await new Promise<typeof Spotify>((resolve, reject) => {
    document.body.append(script);

    script.onerror = (e) => {
      delete script.onerror;

      script.remove();
      reject(e);
    };
    window.onSpotifyWebPlaybackSDKReady = () => {
      delete window.onSpotifyWebPlaybackSDKReady;

      resolve(window.Spotify);
    }
  });

  return {script, spotify};
}
