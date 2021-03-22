import { SpotifyService } from "../../../../services/spotify-service";
import { EventChannel, eventChannel, END } from "redux-saga";
import { take, select, call, cancelled } from "redux-saga/effects";
import { 
  selectIsSpotifyLoggedIn, 
} from "../../../../selectors";
import { retrieveAccessToken } from "../../../retrieve-access-token";

export function* initSpotifyPlayerService(spotifyService: SpotifyService): any {
  const channel: EventChannel<(token: string) => void> = eventChannel(emitter => {
    spotifyService.initPlayer((getToken) => {
      emitter(getToken);
    });
      
    return () => {};
  });

  while (true) {
    try {
      const getToken: END | ((token?: string) => void) = yield take(channel);
    
      const isLoggedIn = yield select(selectIsSpotifyLoggedIn);
  
      if (typeof getToken === 'object') {
        return;
      }
  
      if (!isLoggedIn) {
        getToken();
        return;
      }

      const accessToken: string = yield call(retrieveAccessToken);

      getToken(accessToken);
    } finally {
      if (yield cancelled()) {
        channel.close();
      }
    }
  }
}
