import { AppState } from "state";

export const selectDeezerConnected = ({sources}: AppState) => sources.isDeezerConnected;
export const selectFlashIgnored = ({sources}: AppState) => sources.isFlashMsgIgnored;
export const selectSpotifyAuth = ({sources}: AppState) => sources.spotifyAuthData;
export const selectSpotifyPlayerIgnored = ({sources}: AppState) => sources.isSpotifyPlayerMsgIgnored;
