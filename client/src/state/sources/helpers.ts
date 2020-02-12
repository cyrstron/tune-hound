import { 
  IS_DEEZER_CONNECTED_KEY, 
  FLASH_MSG_IGNORED_KEY,
  SPOTIFY_PLAYER_MSG_IGNORED_KEY, 
  SPOTIFY_AUTH_KEY 
} from "consts";

export function getDeezerConnectedState(): boolean {
  return !!localStorage.getItem(IS_DEEZER_CONNECTED_KEY) || false;
}

export function getFlashIgnoredState(): boolean {
  return !!localStorage.getItem(FLASH_MSG_IGNORED_KEY) || false;
}

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