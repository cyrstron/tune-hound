import createSagaMiddleware from 'redux-saga';
import {spawn} from 'redux-saga/effects'
import { deezerSaga, DeezerService, DEEZER_SERVICE_CTX_KEY } from './deezer';

function* rootSaga() {
  yield spawn(deezerSaga);
}

const sagaMiddleware = createSagaMiddleware({
  context: {
    [DEEZER_SERVICE_CTX_KEY]: new DeezerService(),
    spotifyService: undefined,
  }
});

sagaMiddleware.run(rootSaga);

export {sagaMiddleware}
