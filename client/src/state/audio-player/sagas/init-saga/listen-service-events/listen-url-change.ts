import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put, select} from 'redux-saga/effects';
import { selectCurrentTrack } from '@app/state/player/selectors';
import { PlayerTrack } from '@app/state/player/types';
import { AudioService } from '../../../services/audio-service';
import { setAudioUrl } from '../../../actions';

export function createAudioUrlChangeChannel(
  audioService: AudioService,
): EventChannel<string | null> {
  return eventChannel(emitter => {
    audioService.addEventListener('urlchange', (url) => {
      emitter(url);
    });
      
    return () => {};
  });
}

export function* watchAudioUrlChange(
  audioService: AudioService, 
  channel: EventChannel<string | null>
) {
  const url = audioService.currentUrl;

  const action = setAudioUrl(url);

  yield put(action);
  
  while (true) {
    const url: string | null | END = yield take(channel);
    
    if (!url || typeof url !== 'string') return;

    const action = setAudioUrl(url);

    yield put(action);

    const currentTrack: PlayerTrack = yield select(selectCurrentTrack);

    if (currentTrack && currentTrack.source === 'url' && currentTrack.trackSource.url === url) continue;

    audioService.pause();
  }
}
