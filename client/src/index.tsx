import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import { createAppStore } from './state';
import {App} from './app';
import { PopupProvider } from './components/popup';
import { TooltipProvider } from './components/tooltip';
import { registerServiceWorker } from './services/service-worker';

import './index.scss';

registerServiceWorker();

const store = createAppStore();

ReactDOM.render((
  <Provider store={store}>
    <PopupProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </PopupProvider>
  </Provider>
), document.getElementById('root'));
