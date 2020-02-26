import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import { createAppStore } from './state';
import {App} from './app';
import { PopupProvider } from './components/popup-provider';

import './index.scss';

const store = createAppStore();

ReactDOM.render((
  <Provider store={store}>
    <PopupProvider>
      <App />
    </PopupProvider>
  </Provider>
), document.getElementById('root'));
