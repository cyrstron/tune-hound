import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put, all, select } from 'redux-saga/effects';
import { PlayerTrack } from '@app/state/player/types';
import { selectIsPlaying, selectCurrentTrack } from '@app/state/player/selectors';
import { setIsPlaying, setIsPlayerPending } from '@app/state/player/actions';
import { AudioService } from '@app/state/audio-player';
import { setAudioIsWaiting } from '@app/state/audio-player/actions';
import { selectAudioUrl } from '@app/state/audio-player/selectors';

export function createAudioWaitingChannel(audioService: AudioService): EventChannel<true> {
  return eventChannel(emitter => {
    audioService.addEventListener('waiting', () => {
      emitter(true);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchAudioWaitingChange(channel: EventChannel<true>): any {
  while (true) {
    const isWaiting: boolean | END = yield take(channel);

    if (typeof isWaiting === 'object') return;

    const action = setAudioIsWaiting();

    yield put(action);

    const [currentTrack, isPlayerPlaying, currentUrl]: [
      PlayerTrack | undefined,
      boolean,
      string | null,
    ] = yield all([select(selectCurrentTrack), select(selectIsPlaying), select(selectAudioUrl)]);

    const isCurrentTrackSet =
      currentTrack?.source === 'url' && currentUrl && currentUrl === currentTrack.trackSource.url;

    if (!isCurrentTrackSet || !isPlayerPlaying) continue;

    const pauseAction = setIsPlaying(false);
    const pendingAction = setIsPlayerPending(true);

    yield all([put(pauseAction), put(pendingAction)]);
  }
}
