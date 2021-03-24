import { call } from 'redux-saga/effects';
import { SetSpotifyActivePlayerIgnoredAction } from '../actions';
import { setSpotifyPlayerMsgState } from '../services/helpers';

export function* ignoreSpotifyActivePlayerMsg({
  payload: { isIgnored },
}: SetSpotifyActivePlayerIgnoredAction): any {
  yield call(setSpotifyPlayerMsgState, isIgnored);
}
