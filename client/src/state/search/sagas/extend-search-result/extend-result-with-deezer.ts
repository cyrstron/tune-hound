import {getContext} from 'redux-saga/effects';
import { SearchResult } from "../../types";
import { DeezerService } from "@app/state/deezer";
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';

export function* extendResultWithDeezer(item: SearchResult) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);
  
  return null;
}