import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {rootReducer} from 'state';
import {App} from './app';
import {ApisProvider} from './components/apis';

import './index.scss';

const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <ApisProvider
      deezerAppId={process.env.DEEZER_PLAYER_ID as string}
      deezerChannelUrl={`${process.env.HOST}/deezer-channel`}
    >
      <App />
    </ApisProvider>
  </Provider>
), document.getElementById('root'));
