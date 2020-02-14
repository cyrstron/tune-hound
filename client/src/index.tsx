import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import { createAppStore } from './state';
import {App} from './app';
// import {ApisProvider} from './components/apis';

import './index.scss';

const store = createAppStore();

ReactDOM.render((
  <Provider store={store}>
    {/* <ApisProvider
      deezerAppId={process.env.DEEZER_PLAYER_ID as string}
      deezerChannelUrl={`${process.env.HOST}/deezer-channel`}
    > */}
      <App />
    {/* </ApisProvider> */}
  </Provider>
), document.getElementById('root'));
