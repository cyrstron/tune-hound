import {takeEvery, getContext, select, delay} from 'redux-saga/effects';
import { SET_CURRENT_TRACK } from '@app/state/player/consts';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer/services';
import { SetCurrentTrackAction } from '@app/state/player/actions';
import { selectDeezerCurrentTrack, selectDeezerIsPlaying } from '@app/state/deezer/selectors';

export function* watchCurrentTrack() {
  yield takeEvery(SET_CURRENT_TRACK, setCurrentTrack);
}

export function* setCurrentTrack({payload: {track, isAutoplay}}: SetCurrentTrackAction) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  if (track.source !== 'deezer') return;

  const playingTrack: DeezerSdk.Track | null = yield select(selectDeezerCurrentTrack);

  if (!playingTrack || +playingTrack.id !== track.trackSource.id) {
    yield deezerService.player.playTracks([track.trackSource.id], isAutoplay);

    yield delay(1000);

    const isPlaying = yield select(selectDeezerIsPlaying);

    if (!isPlaying && isAutoplay) {
      deezerService.player.play();
    } else if (isPlaying && !isAutoplay) {
      deezerService.player.pause();
    }
  } else if (isAutoplay) {
    deezerService.player.seek(0);
    deezerService.player.play();
  } else {
    deezerService.player.seek(0);
    deezerService.player.pause();
  }
}