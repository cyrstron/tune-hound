import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app';
import { ApisProvider } from './apis';

import './index.scss';

ReactDOM.render((
  <>
    <ApisProvider>
      <App />
    </ApisProvider>
  </>
), document.getElementById('root'));
