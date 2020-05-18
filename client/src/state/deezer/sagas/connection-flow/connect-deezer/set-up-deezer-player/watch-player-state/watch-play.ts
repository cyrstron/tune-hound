import {takeEvery, getContext, select} from 'redux-saga/effects';
import {PLAY} from '@app/state/player/consts';
import {DEEZER_SERVICE_CTX_KEY} from '@app/consts';
import {DeezerService} from '@app/state/deezer/services';
import {selectCurrentTrack} from '@app/state/player/selectors';
import {PlayerTrack} from '@app/state/player/types';
import {selectDeezerCurrentTrack} from '@app/state/deezer/selectors';

export function* updatePlay(): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const currentTrack: PlayerTrack | undefined = yield select(selectCurrentTrack);

  if (currentTrack?.source !== 'deezer') return;

  const playingTrack: DeezerSdk.Track | null = yield select(selectDeezerCurrentTrack);

  if (!playingTrack || +playingTrack.id !== currentTrack.trackSource.id) {
    deezerService.player.playTracks([currentTrack.trackSource.id], true);
  } else {
    deezerService.player.play();
  }
}

export function* watchPlay(): any {
  yield takeEvery(PLAY, updatePlay);
}
