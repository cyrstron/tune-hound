import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put, select, all } from 'redux-saga/effects';
import { selectIsPlaying, selectCurrentTrack } from '@app/state/player/selectors';
import { PlayerTrack } from '@app/state/player/types';
import { setIsPlaying } from '@app/state/player/actions';
import { AudioService } from '@app/state/audio-player';
import { setAudioIsPlaying } from '@app/state/audio-player/actions';
import { selectAudioUrl } from '@app/state/audio-player/selectors';

export function createAudioPlayChannel(audioService: AudioService): EventChannel<true> {
  return eventChannel(emitter => {
    audioService.addEventListener('play', () => {
      emitter(true);
    });

    audioService.addEventListener('playing', () => {
      emitter(true);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchAudioPlayChange(
  audioService: AudioService,
  channel: EventChannel<true>,
): any {
  while (true) {
    const isPlaying: true | END = yield take(channel);

    if (typeof isPlaying === 'object') return;

    const action = setAudioIsPlaying(isPlaying);

    yield put(action);

    const [currentTrack, isPlayerPlaying, currentUrl]: [
      PlayerTrack | undefined,
      boolean,
      string | null,
    ] = yield all([select(selectCurrentTrack), select(selectIsPlaying), select(selectAudioUrl)]);

    const isCurrentTrackSet =
      currentTrack?.source === 'url' && currentUrl && currentUrl === currentTrack.trackSource.url;

    if (isCurrentTrackSet && isPlayerPlaying) continue;

    if (!isCurrentTrackSet) {
      audioService.pause();
    } else {
      const action = setIsPlaying(isPlaying);

      yield put(action);
    }
  }
}
