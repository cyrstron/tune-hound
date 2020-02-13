import { AppState } from "state";
import { SpotifyAuthData } from "./helpers";

export const selectDeezerConnected = (
  {sources}: AppState,
): boolean => sources.deezer.isConnected;
export const selectFlashMsgIgnored = (
  {sources}: AppState,
): boolean => sources.deezer.isFlashMsgIgnored;
export const selectFlashEnabled = (
  {sources}: AppState,
): boolean => sources.deezer.isFlashEnabled;
export const selectDeezerError = (
  {sources}: AppState,
): Error | undefined => sources.deezer.error;
export const selectDeezerPending = (
  {sources}: AppState,
): boolean => sources.deezer.isPending;


export const selectSpotifyAuth = (
  {sources}: AppState,
): SpotifyAuthData | undefined => sources.spotify.authData;
export const selectSpotifyPlayerIgnored = (
  {sources}: AppState,
): boolean => sources.spotify.isPlayerMsgIgnored;
