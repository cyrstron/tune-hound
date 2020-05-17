import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put, all, select} from 'redux-saga/effects';
import { PlayerTrack } from '@app/state/player/types';
import { selectIsPlaying, selectCurrentTrack } from '@app/state/player/selectors';
import { setIsPlaying } from '@app/state/player/actions';
import { AudioService } from '@app/state/audio-player';
import { setAudioIsPlaying } from '@app/state/audio-player/actions';
import { selectAudioUrl } from '@app/state/audio-player/selectors';

export function createAudioPauseChannel(
  audioService: AudioService,
): EventChannel<false> {
  return eventChannel(emitter => {
    audioService.addEventListener('pause', () => {
      emitter(false);
    });
      
    return () => {};
  });
}

export function* watchAudioPauseChange(channel: EventChannel<false>) {
  while (true) {
    const isPlaying: boolean | END = yield take(channel);
    
    if (typeof isPlaying === 'object') return;

    const action = setAudioIsPlaying(isPlaying);

    yield put(action);

    const [currentTrack, isPlayerPlaying, currentUrl]: [
      PlayerTrack | undefined, 
      boolean, 
      string | null
    ] = yield all([
      select(selectCurrentTrack),
      select(selectIsPlaying),
      select(selectAudioUrl)
    ]);

    const isCurrentTrackSet = currentTrack?.source === 'url' && 
      currentUrl && currentUrl === currentTrack.trackSource.url;

    if (!isCurrentTrackSet || !isPlayerPlaying) continue;

    const pauseAction = setIsPlaying(isPlaying);

    yield put(pauseAction);
  }
}
