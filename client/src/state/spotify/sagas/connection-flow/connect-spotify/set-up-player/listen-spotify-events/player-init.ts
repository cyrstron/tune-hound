import { SpotifyService } from "../../../../../services/spotify-service";
import { EventChannel, eventChannel, END } from "redux-saga";
import { take, all, select, call } from "redux-saga/effects";
import { updateSpotifyTokenSaga } from "../../../../update-token";
import { 
  selectIsSpotifyLoggedIn, 
  selectIsSpotifyTokenExpired, 
  selectSpotifyAccessToken 
} from "../../../../../selectors";

export function* initSpotifyPlayer(spotifyService: SpotifyService): any {
  const channel: EventChannel<(token: string) => void> = eventChannel(emitter => {
    spotifyService.initPlayer((getToken) => {
      emitter(getToken);
    });
      
    return () => {};
  });

  while (true) {
    const getToken: END | ((token?: string) => void) = yield take(channel);
    
    const [isLoggedIn, isExpired] = yield all([
      select(selectIsSpotifyLoggedIn),
      select(selectIsSpotifyTokenExpired),
    ]);

    if (typeof getToken === 'object') {
      return;
    }

    if (!isLoggedIn) {
      getToken();
      return;
    }

    if (isExpired) {
      yield call(updateSpotifyTokenSaga);
    }

    const accessToken: string = yield select(selectSpotifyAccessToken);

    getToken(accessToken);
  }
}
