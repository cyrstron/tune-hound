import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put, select } from 'redux-saga/effects';
import { DeezerService } from '@app/state/deezer/services';
import { setIsPlayerNotMuted } from '@app/state/deezer/actions';
import { selectIsMuted } from '@app/state/player/selectors';

export function createMuteChangeChannel(deezerService: DeezerService): EventChannel<boolean> {
  return eventChannel(emitter => {
    deezerService.events.subscribe('mute_changed', isMuted => {
      emitter(isMuted);
    });

    return (): void => {
      return;
    };
  });
}

export function* watchMuteChange(
  deezerService: DeezerService,
  channel: EventChannel<boolean>,
): any {
  const isNotMuted = deezerService.player.getMute();

  const action = setIsPlayerNotMuted(isNotMuted);

  yield put(action);

  while (true) {
    const isNotMuted: boolean | END = yield take(channel);

    if (typeof isNotMuted !== 'boolean') return;

    const action = setIsPlayerNotMuted(isNotMuted);

    yield put(action);

    const isPlayerMuted = yield select(selectIsMuted);

    if (!isNotMuted === isPlayerMuted) continue;

    deezerService.player.setMute(isPlayerMuted);
  }
}
