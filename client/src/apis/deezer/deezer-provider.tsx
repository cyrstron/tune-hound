import React, { Component } from "react";
import { DeezerCtxProvider } from "./";
import { DeezerService } from "./services/deezer-service";

export interface DeezerProviderProps {
}

export interface DeezerProviderState {
  isConnected?: boolean;
  dz?: DeezerService;
}

class DeezerProvider extends Component<DeezerProviderProps, DeezerProviderState> {
  state: DeezerProviderState = {};
  script?: HTMLScriptElement;
  root?: HTMLDivElement;

  async componentDidMount() {
    const wasConnected = localStorage.getItem('deezer') === 'true';

    if (!wasConnected) {
      this.setState({
        isConnected: false,
      });

      return;
    };

    const dz = await this.init();

    const isLoggedIn = await dz.isLoggedIn();

    this.setState({
      isConnected: isLoggedIn,
      dz,
    });
  }

  async init(): Promise<DeezerService> {
    this.script = document.createElement('script');
    this.root = document.createElement('div');

    const script = this.script!
    const root = this.root!

    root.id = 'dz-root';

    script.type = 'text/javascript';
    script.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';

    document.body.append(script);
    document.body.append(root);

    await new Promise((res, rej) => {
      script.onload = res;
      script.onerror = rej;
    });

    const dz = new DeezerService(window.DZ, this.onLogout);

    await dz.init({
      appId: process.env.DEEZER_PLAYER_ID as string,
      channelUrl: 'http://127.0.0.1:3000/deezer-channel',
      player: {
        onload: function () {
          console.log('dz loaded');
        }
      }
    });    
    
    return dz;
  }

  onLogout = () => {
    localStorage.removeItem('deezer');

    this.setState({
      isConnected: false,
    });
  }

  connect = async () => {
    try {
      let {dz} = this.state;

      if (!dz) { 
        dz = await this.init();
      }

      await dz.login();

      localStorage.setItem('deezer', 'true');

      this.setState({
        dz,
        isConnected: true,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        isConnected: false,
      });
    }
  }

  componentWillUnmount() {
    this.script && this.script.remove();
    this.root && this.root.remove();
  }

  render() {
    const {children} = this.props;
    const {dz, isConnected} = this.state;

    const value = {
      dz: isConnected ? dz : undefined, 
      connectDeezer: this.connect,
      isDeezerPending: isConnected === undefined,
    }

    return (
      <DeezerCtxProvider value={value}>
        {children}
      </DeezerCtxProvider>
    )
  }
}

export {DeezerProvider}
