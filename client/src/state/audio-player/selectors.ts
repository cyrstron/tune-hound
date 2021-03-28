import { createSelector } from 'reselect';
import { AppState } from '..';
import { AudioState } from './reducer';

export const selectAudioState = (state: AppState): AudioState => state.audio;

export const selectAudioUrl = createSelector([selectAudioState], audio => audio.currentUrl);
