import React, {Component} from 'react';
import { PopupCtxProvider } from '.';

export interface PopupProviderState {
  container?: HTMLDivElement;
}

export class PopupProvider extends Component<{}, PopupProviderState> {
  state: PopupProviderState = {
    container: document.getElementById('app-popup') as HTMLDivElement,
  };

  render() {
    const {children} = this.props;
    const {container} = this.state;

    return (
      <PopupCtxProvider value={container}>
        {children}
      </PopupCtxProvider>
    );
  }
}