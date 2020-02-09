import React, { Component } from "react";
import { DeezerCtxProvider } from ".";
import { DeezerService } from "./services/deezer-service";
import { FlashPopup } from "./components/flash-popup";
import { mountDeezerScript } from "./services/services/helpers";

export interface DeezerProviderProps {
}

export interface DeezerProviderState {
  isConnected?: boolean;
  dz?: DeezerService;
  isFlashEnabled?: boolean;
  error?: Error;
}

class DeezerProvider extends Component<DeezerProviderProps, DeezerProviderState> {
  state: DeezerProviderState = {};

  service: DeezerService;

  constructor(props: DeezerProviderProps) {
    super(props);

    this.service = new DeezerService();
  }

  async componentDidMount() {
    const wasConnected = localStorage.getItem('deezer') === 'true';

    if (!wasConnected) {
      this.setState({
        isConnected: false,
      });

      return;
    };

    try {
      await this.init();
    } catch (error) {
      this.setState({error});
    }
  }

  async init(): Promise<void> {
    await this.service.mount({
      appId: process.env.DEEZER_PLAYER_ID as string,
      channelUrl: 'http://127.0.0.1:3000/deezer-channel',
    });

    const isLoggedIn = await this.service.isLoggedIn(); 
    
    this.setState({
      isConnected: isLoggedIn,
      isFlashEnabled: this.service.isFlashEnabled,
    });
  }

  disconnect = () => {
    try {
      this.service.disconnect();
  
      localStorage.removeItem('deezer');
  
      this.setState({
        isConnected: false,
      });
    } catch (error) {
      this.setState({error});
    }
  }

  connect = async () => {
    try {
      if (!this.service.script) {
        await this.init();
      }
  
      if (!this.state.isConnected) {
        await this.service.connect();

        this.setState({
          isConnected: true,
        });
      }
      
      localStorage.setItem('deezer', 'true');
    } catch (error) {
      this.setState({error});
    }
  }

  componentWillUnmount() {
    this.service.unmount();
  }

  render() {
    const {children} = this.props;
    const {isConnected, isFlashEnabled} = this.state;

    const value = {
      dz: isConnected ? this.service : undefined, 
      connectDeezer: this.connect,
      disconnectDeezer: this.disconnect,
      isDeezerPending: isConnected === undefined,
    }

    return (
      <>
        {isFlashEnabled ===false && (
          <FlashPopup />
        )}
        <DeezerCtxProvider value={value}>
          {children}
        </DeezerCtxProvider>
      </>
    )
  }
}

export {DeezerProvider}
