import React, { Component } from "react";
import { DeezerCtxProvider } from ".";
import { DeezerService } from "./services/deezer-service";
import { FlashPopup } from "./components/flash-popup";

export interface DeezerProviderProps {
  appId: string;
  channelUrl: string;
}

export interface DeezerProviderState {
  isConnected?: boolean;
  dz?: DeezerService;
  isFlashEnabled?: boolean;
  isFlashIgnored: boolean;
  error?: Error;
}

class DeezerProvider extends Component<DeezerProviderProps, DeezerProviderState> {
  state: DeezerProviderState = {
    isFlashIgnored: !!localStorage.getItem('deezerFlashIgnored') || false,
  };

  service: DeezerService;

  constructor(props: DeezerProviderProps) {
    super(props);

    this.service = new DeezerService();
  }

  async componentDidMount() {
    const wasConnected = localStorage.getItem('deezerConnected') === 'true';

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
    const {appId, channelUrl} = this.props;
    
    await this.service.mount({
      appId,
      channelUrl,
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
  
      localStorage.removeItem('deezerConnected');
  
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
      
      localStorage.setItem('deezerConnected', 'true');
    } catch (error) {
      this.setState({error});
    }
  }

  ignoreFlash = () => {
    localStorage.setItem('deezerFlashIgnored', 'true');

    this.setState({
      isFlashIgnored: true,
    });
  }

  componentWillUnmount() {
    this.service.unmount();
  }

  render() {
    const {children} = this.props;
    const {isConnected, isFlashEnabled, isFlashIgnored} = this.state;

    const value = {
      dz: isConnected ? this.service : undefined, 
      connectDeezer: this.connect,
      disconnectDeezer: this.disconnect,
      isDeezerPending: isConnected === undefined,
    }

    return (
      <>
        {!isFlashIgnored && isFlashEnabled === false && (
          <FlashPopup 
            ignoreFlash={this.ignoreFlash}
          />
        )}
        <DeezerCtxProvider value={value}>
          {children}
        </DeezerCtxProvider>
      </>
    )
  }
}

export {DeezerProvider}
