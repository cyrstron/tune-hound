import { DeezerTrackSourceItemShort, DeezerTrackSourceItemFull } from "@app/state/search/types";
import { DeezerService } from "@app/state/deezer";
import {getContext} from 'redux-saga/effects';
import { DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { DeezerTrackFull } from "@app/state/deezer/types";

export function* fetchTrackDetails(track: DeezerTrackSourceItemShort) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const fullTrack: DeezerTrackFull = yield deezerService.getTrack(track.id);

  const result: DeezerTrackSourceItemFull = {
    ...fullTrack,
    isFull: true,
  };

  return result;
}