import React, {Component} from 'react';
import {TooltipCtxProvider} from '.';

export interface PopupProviderState {
  container?: HTMLDivElement;
}

export class TooltipProvider extends Component<{}, PopupProviderState> {
  state: PopupProviderState = {
    container: document.getElementById('app-tooltip') as HTMLDivElement,
  };

  render() {
    const {children} = this.props;
    const {container} = this.state;

    return (
      <TooltipCtxProvider value={container}>
        {children}
      </TooltipCtxProvider>
    );
  }
}
