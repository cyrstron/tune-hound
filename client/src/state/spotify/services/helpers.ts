import {
  SPOTIFY_PLAYER_MSG_IGNORED_KEY, 
  SPOTIFY_AUTH_KEY 
} from "consts";

export function getSpotifyPlayerMsgState(): boolean {
  return !!localStorage.getItem(SPOTIFY_PLAYER_MSG_IGNORED_KEY) || false;
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
    spotifyAuthData = spotifyAuthDataString ? JSON.parse(spotifyAuthDataString) : undefined;
  } catch {}

  return spotifyAuthData
}

export async function mountSpotifyScript(): Promise<HTMLScriptElement> {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = 'https://sdk.scdn.co/spotify-player.js';

  await new Promise((resolve, reject) => {
    document.body.append(script);

    script.onerror = (e) => {
      delete script.onerror;

      script.remove();
      reject(e);
    };
    window.onSpotifyWebPlaybackSDKReady = () => {
      delete window.onSpotifyWebPlaybackSDKReady;

      resolve();
    }

  });

  return script;
}
