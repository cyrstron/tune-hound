import { AppState } from "state";

export const selectDeezerConnected = (
  {deezer}: AppState,
): boolean => deezer.isConnected;

export const selectFlashMsgIgnored = (
  {deezer}: AppState,
): boolean => deezer.isFlashMsgIgnored;

export const selectFlashEnabled = (
  {deezer}: AppState,
): boolean => deezer.isFlashEnabled;

export const selectDeezerError = (
  {deezer}: AppState,
): Error | undefined => deezer.error;

export const selectDeezerPending = (
  {deezer}: AppState,
): boolean => deezer.isPending;
