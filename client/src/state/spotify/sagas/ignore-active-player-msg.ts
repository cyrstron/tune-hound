import { take } from "redux-saga/effects";
import {
  SetSpotifyActivePlayerIgnoredAction,
} from "../actions";
import {
  SET_SPOTIFY_ACTIVE_PLAYER_IGNORED,
} from '../consts';
import { setSpotifyPlayerMsgState } from "../services/helpers";

export function* ignoreSpotifyActivePlayerMsg() {
  const {
    payload: {isIgnored},
  }: SetSpotifyActivePlayerIgnoredAction = yield take(SET_SPOTIFY_ACTIVE_PLAYER_IGNORED);

  setSpotifyPlayerMsgState(isIgnored);
}