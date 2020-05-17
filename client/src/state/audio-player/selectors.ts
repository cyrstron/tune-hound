import { AppState } from "..";

export const selectAudioUrl = (state: AppState) => state.audio.currentUrl;
