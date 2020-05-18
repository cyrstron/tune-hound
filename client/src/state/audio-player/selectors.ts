import {AppState} from '..';

export const selectAudioUrl = (state: AppState): string | null => state.audio.currentUrl;
