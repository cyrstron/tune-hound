import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';
import { DeezerProvider } from 'apis/deezer';

import './index.scss';

ReactDOM.render((
  <>
    <DeezerProvider>
      <App />
    </DeezerProvider>
  </>
), document.getElementById('root'));
