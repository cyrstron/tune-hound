import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import { createAppStore } from './state';
import {App} from './app';
import { PopupProvider } from './components/popup-provider/popup-provider';
// import {ApisProvider} from './components/apis';

import './index.scss';

const store = createAppStore();

ReactDOM.render((
  <Provider store={store}>
    <PopupProvider>
      <App />
    </PopupProvider>
    {/* <ApisProvider
      deezerAppId={process.env.DEEZER_PLAYER_ID as string}
      deezerChannelUrl={`${process.env.HOST}/deezer-channel`}
    > */}
    {/* </ApisProvider> */}
  </Provider>
), document.getElementById('root'));
