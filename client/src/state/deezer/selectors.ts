import { AppState } from "state";

export const selectDeezerIsConnected = (
  {deezer}: AppState,
): boolean => deezer.isConnected;

export const selectDeezerWasConnected = (
  {deezer}: AppState,
): boolean => deezer.wasConnected;

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

export const selectDeezerMounted = (
  {deezer}: AppState,
): boolean => deezer.isMounted;

export const selectDeezerInited = (
  {deezer}: AppState,
): boolean => deezer.isInited;

export const selectDeezerIsPremium = (
  {deezer}: AppState,
): boolean => !!deezer.currentUser && deezer.currentUser['status'] > 0;
