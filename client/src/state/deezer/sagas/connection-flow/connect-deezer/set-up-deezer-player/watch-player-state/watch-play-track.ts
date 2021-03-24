import { takeEvery, getContext } from 'redux-saga/effects';
import { PLAY_TRACK } from '@app/state/player/consts';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer/services';
import { PlayTrackAction } from '@app/state/player/actions';

export function* playTrack({ payload: { track } }: PlayTrackAction): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  if (track.source !== 'deezer') return;

  deezerService.player.playTracks([track.trackSource.id]);
}

export function* watchPlayTrack(): any {
  yield takeEvery(PLAY_TRACK, playTrack);
}
