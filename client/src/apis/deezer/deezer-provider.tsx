import React, { Component } from "react";
import { DeezerCtxProvider } from "./";

export interface DeezerProviderProps {
  // token: string;
}

export interface DeezerProviderState {
  isConnected?: boolean;
  DZ?: DeezerSdk.DZ;
}

class DeezerProvider extends Component<DeezerProviderProps, DeezerProviderState> {
  state: DeezerProviderState = {};
  script?: HTMLScriptElement;
  root?: HTMLDivElement;

  async componentDidMount() {
    window.dzAsyncInit = this.init;

    this.script = document.createElement('script');
    this.root = document.createElement('div');

    this.root.id = 'dz-root';

    this.script.type = 'text/javascript';
    this.script.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';

    document.body.append(this.script);
    document.body.append(this.root);
  }

  init = async () => {
    window.DZ.init({
      appId: process.env.DEEZER_PLAYER_ID as string,
      channelUrl: 'http://127.0.0.1:3000/deezer-channel',
      player: {
        onload: function () {
          console.log('dz loaded');
        }
      }
    });

    const options = await new Promise((resolve, reject) => {
      window.DZ.ready((options) => {
        resolve(options);
      });
    });

    console.log(options);

    this.setState({
      isConnected: true,
      DZ: window.DZ,
    });
  };

  componentWillUnmount() {
    this.script && this.script.remove();
    this.root && this.root.remove();

    delete window.dzAsyncInit;
  }

  render() {
    const {children} = this.props;
    const {DZ, isConnected} = this.state;

    return (
      <DeezerCtxProvider value={isConnected ? DZ : undefined}>
        {children}
      </DeezerCtxProvider>
    )
  }
}

export {DeezerProvider}
