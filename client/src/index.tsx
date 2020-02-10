import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';
import { ApisProvider } from './apis';

import './index.scss';

ReactDOM.render((
  <>
    <ApisProvider
      deezerAppId={process.env.DEEZER_PLAYER_ID as string}
      deezerChannelUrl={`${process.env.HOST}/deezer-channel`}
    >
      <App />
    </ApisProvider>
  </>
), document.getElementById('root'));
