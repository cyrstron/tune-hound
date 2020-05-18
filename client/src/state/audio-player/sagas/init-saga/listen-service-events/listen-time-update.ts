import {eventChannel, EventChannel, END} from 'redux-saga';
import throttle from 'lodash/throttle';
import {take, put, select, all} from 'redux-saga/effects';
import {selectIsPlaying, selectCurrentTrack} from '@app/state/player/selectors';
import {setPosition} from '@app/state/player/actions';
import {PlayerTrack} from '@app/state/player/types';
import {AudioService} from '@app/state/audio-player/services/audio-service';
import {setAudioCurrentTime} from '@app/state/audio-player/actions';

export function createAudioCurrentTimeChannel(
  audioService: AudioService,
): EventChannel<number> {
  return eventChannel((emitter) => {
    const onTimeChanged = throttle(() => {
      const currentTime = audioService.currentTime;

      emitter(currentTime);
    }, 200);

    audioService.addEventListener('timeupdate', onTimeChanged);

    return (): void => {
      return;
    };
  });
}

export function* watchAudioCurrentTimeChange(
  audioService: AudioService,
  channel: EventChannel<number>,
): any {
  while (true) {
    const currentTime: number | END = yield take(channel);

    if (typeof currentTime !== 'number') return;

    const action = setAudioCurrentTime(currentTime);

    yield put(action);

    const [playingTrack, isPlayerPlaying]: [PlayerTrack, boolean] = yield all([
      select(selectCurrentTrack),
      select(selectIsPlaying),
    ]);

    if (playingTrack.source !== 'url' || !isPlayerPlaying) {
      audioService.pause();
    } else {
      const action = setPosition(currentTime / playingTrack.duration * 100);

      yield put(action);
    }
  }
}
