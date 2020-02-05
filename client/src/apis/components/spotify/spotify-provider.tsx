import React, { Component } from "react";
import { SpotifyCtxProvider, SpotifyCtx } from ".";
import axios, { AxiosError } from "axios";
import { ActivePlayerPopup } from "./components/active-player-popup";

export interface SpotifyProviderProps {
}

export interface SpotifyProviderState {
  isConnected?: boolean;
  accessToken?: string;
  refreshToken?: string;
  player?: Spotify.SpotifyPlayer;
  deviceId?: string;
  state?: Spotify.PlaybackState | null;
  error?: Spotify.Error;
}

declare global {
  interface Window {
    player: Spotify.SpotifyPlayer;
  }
}

class SpotifyProvider extends Component<SpotifyProviderProps, SpotifyProviderState> {
  state: SpotifyProviderState = {};
  script?: HTMLScriptElement;

  resolve?: () => void;

  async componentDidMount() {
    const refreshToken = localStorage.getItem('spotifyRefreshToken');

    if (!refreshToken) {
      this.setState({
        isConnected: false,
      });

      return;
    } 
    
    try {
      const {
        data: {'access_token': accessToken}
      } = await axios.get(`/refresh-token?refresh_token=${refreshToken}`);
  
      this.setState({
        accessToken,
        refreshToken,
      });
  
      const player = await this.init();
  
      this.setState({
        player,
        isConnected: true,
      });
    } catch (err) {
      console.log(err);

      this.setState({
        isConnected: false,
      });
    }
  }

  getToken = (
    callback: (token: string) => void
  ) => {
    const {accessToken} = this.state;

    callback(accessToken!); 
  }

  handleError: Spotify.ErrorListener = (error) => {
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

  onSdkReady = async () => {
    this.resolve && this.resolve();
  }
  
  async init(): Promise<Spotify.SpotifyPlayer> {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://sdk.scdn.co/spotify-player.js';

    document.body.append(script);

    this.script = script;

    window.onSpotifyWebPlaybackSDKReady = this.onSdkReady;

    await new Promise<Spotify.SpotifyPlayer>((res) => {
      this.resolve = res;
    });

    delete this.resolve;
    
    const player: Spotify.SpotifyPlayer = new window.Spotify.Player({
      name: 'Tune Hound Preview Player',
      getOAuthToken: this.getToken,
    });
  
    player.addListener('initialization_error', this.handleError);
    player.addListener('authentication_error', this.handleError);
    player.addListener('account_error', this.handleError);
    player.addListener('playback_error', this.handleError);

    player.addListener('player_state_changed', this.onStateChange);

    const isConnected = await player.connect();

    if (!isConnected) {
      throw new Error('Connection failed');
    }
    
    const deviceId = await new Promise<string>((res) => { 
      const onReady = ({'device_id': deviceId}: Spotify.WebPlaybackInstance) => {
        res(deviceId);

        player.removeListener('ready', onReady);
        player.removeListener('not_ready', onReady);

        player.addListener('ready', this.onPlayerReady);
        player.addListener('not_ready', this.onPlayerNotReady);
      }

      player.addListener('ready', onReady);
      player.addListener('not_ready', onReady);
    });

    this.setState({deviceId});

    try {
      await axios.put<void>('https://api.spotify.com/v1/me/player', {
        device_ids: [deviceId],
        play: true,
      }, {
        headers: {
          'Authorization': `Bearer ${this.state.accessToken!}`
        }
      });
    } catch (err) {
      const error = err as AxiosError<SpotifyApi.RestrictionError>;

      if (error?.response?.data?.error?.reason !== 'PREMIUM_REQUIRED') throw error;

      this.setState({
        state: null,
      });
    }

    return player;
  }

  async login(): Promise<{
    accessToken: string, 
    refreshToken: string
  }> {
    window.open('/login-spotify');

    return new Promise<{
      accessToken: string, 
      refreshToken: string
    }>((res) => {
      const onMessage = (e: MessageEvent) => {
        window.removeEventListener('message', onMessage);

        res(e.data);
      };

      window.addEventListener('message', onMessage);
    });
  }

  connect = async () => {
    try {
      let {player} = this.state;

      const {
        accessToken,
        refreshToken,
      } = await this.login();

      this.setState({
        accessToken,
        refreshToken,
      });

      localStorage.setItem('spotifyRefreshToken', refreshToken);

      if (!player) {
        player = await this.init();
      }

      this.setState({
        isConnected: true,
        player,
      });
    } catch (err) {
      console.log(err);

      this.setState({
        isConnected: false,
      });
    }    
  }

  disconnect = () => {
    localStorage.removeItem('spotifyRefreshToken');

    this.setState({
      isConnected: false,
      accessToken: undefined,
      refreshToken: undefined,
    });
  }

  componentWillUnmount() {
    this.script && this.script.remove();

    delete window.onSpotifyWebPlaybackSDKReady;
  }

  render() {
    const {children} = this.props;
    const {player, isConnected, state} = this.state;

    const value: SpotifyCtx = {
      spotifyPlayer: isConnected ? player : undefined,
      isSpotifyPending: isConnected === undefined,
      connectSpotify: this.connect,
      disconnectSpotify: this.disconnect,
    }

    return (
      <>
        {state === null && (
          <ActivePlayerPopup />
        )}
        <SpotifyCtxProvider value={value}>
          {children}
        </SpotifyCtxProvider>
      </>
    )
  }
}

export {SpotifyProvider}
