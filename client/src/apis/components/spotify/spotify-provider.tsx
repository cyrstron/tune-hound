import React, { Component } from "react";
import axios from "axios";
import { SpotifyCtxProvider, SpotifyCtx } from ".";
import {SpotifyService} from './services/spotify-service';
import { ActivePlayerPopup } from "./components/active-player-popup";
import { SpotifyWebApi, SpotifyAuthPayload } from "./services/services/spotify-web-api";

export interface SpotifyProviderProps {
}

export interface SpotifyProviderState {
  isConnected?: boolean;
  deviceId?: string;
  state?: Spotify.PlaybackState | null;
  isActiveIgnored: boolean;
  error?: Spotify.Error;
}

class SpotifyProvider extends Component<SpotifyProviderProps, SpotifyProviderState> {
  state: SpotifyProviderState = {
    isActiveIgnored: !!localStorage.getItem('isSpotifyActiveIgnored'),
  };

  api: SpotifyWebApi;
  service: SpotifyService;

  constructor(props: SpotifyProviderProps) {
    super(props);

    this.api = new SpotifyWebApi(axios);
    this.service = new SpotifyService(this.api);
  }

  setIsActiveIgnored = (isIgnored: boolean) => {
    if (isIgnored) {
      localStorage.setItem('isSpotifyActiveIgnored', `${isIgnored}`);
    } else {
      localStorage.removeItem('isSpotifyActiveIgnored');
    }

    this.setState({
      isActiveIgnored: isIgnored,
    });
  }

  async componentDidMount() {
    const spotifyAuthData = localStorage.getItem('spotifyAuthTokens');

    if (!spotifyAuthData) {
      this.setState({
        isConnected: false,
      });

      return;
    }
    
    try {
      const {
        expiresIn, 
        ...authTokens
      } = JSON.parse(spotifyAuthData) as Omit<SpotifyAuthPayload, 'expiresIn'> & {
        expiresIn: number;
      };

      await this.api.setAuthTokens({
        ...authTokens, 
        expiresIn: new Date(expiresIn),
      });

      await this.init();
    } catch (err) {
      console.log(err);

      this.setState({
        isConnected: false,
      });
    }
  }

  onError: Spotify.ErrorListener = (error) => {
    this.setState({error})
  }

  onPlayerReady: Spotify.PlaybackInstanceListener = ({'device_id': deviceId}) => {
    console.log(`Player is ready`);

    this.setState({deviceId});
  }

  onPlayerNotReady: Spotify.PlaybackInstanceListener = ({'device_id': deviceId}) => {
    console.log(`Player is not ready`);

    this.setState({deviceId});
  }

  onStateChange: Spotify.PlaybackStateListener = (state) => {
    this.setState({state});
  }
  
  async init(): Promise<void> {
    const handlers = {
      onError: this.onError,
      onStateChange: this.onStateChange,
      onReady: this.onPlayerReady,
      onNotReady: this.onPlayerNotReady,
    }

    if (!this.service.script) {
      await this.service.mount(handlers);
    } else {
      await this.service.connect(handlers);
    }

    this.setState({
      isConnected: true,
      state: this.service.isActive ? undefined : null,
    });
  }

  connect = async () => {
    try {
      await this.api.login();

      const authTokens = this.api.getAuthTokens();

      localStorage.setItem('spotifyAuthTokens', JSON.stringify(authTokens));

      await this.init();
    } catch (err) {
      console.log(err);

      this.setState({
        isConnected: false,
      });
    }
  }

  disconnect = () => {
    localStorage.removeItem('spotifyAuthTokens');

    this.api.resetAuthTokens();
    this.service.disconnect();

    this.setState({
      isConnected: false,
      deviceId: undefined,
      state: undefined,
      error: undefined,
    });
  }

  componentWillUnmount() {
    this.service.unmount();
  }

  render() {
    const {children} = this.props;
    const {isConnected, isActiveIgnored ,state} = this.state;

    const value: SpotifyCtx = {
      spotifyService: isConnected ? this.service : undefined,
      isSpotifyPending: isConnected === undefined,
      connectSpotify: this.connect,
      disconnectSpotify: this.disconnect,
    }

    return (
      <>
        {state === null && !isActiveIgnored && (
          <ActivePlayerPopup setIgnored={this.setIsActiveIgnored}/>
        )}
        <SpotifyCtxProvider value={value}>
          {children}
        </SpotifyCtxProvider>
      </>
    )
  }
}

export {SpotifyProvider}
