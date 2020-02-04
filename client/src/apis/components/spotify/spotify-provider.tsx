import React, { Component } from "react";
import { SpotifyCtxProvider, SpotifyCtx } from ".";

export interface SpotifyProviderProps {
}

export interface SpotifyProviderState {
  isConnected?: boolean;
  accessToken?: string;
  refreshToken?: string;
  player?: Spotify.SpotifyPlayer;
  instance?: Spotify.WebPlaybackInstance;
  state?: Spotify.PlaybackState;
  error?: Spotify.Error;
}

class SpotifyProvider extends Component<SpotifyProviderProps, SpotifyProviderState> {
  state: SpotifyProviderState = {};
  script?: HTMLScriptElement;

  resolve?: (player: Spotify.SpotifyPlayer) => void;
  reject?: (err: Error) => void;

  async componentDidMount() {
    const accessToken = localStorage.getItem('spotifyAccessToken');
    const refreshToken = localStorage.getItem('spotifyRefreshToken');

    if (!accessToken || !refreshToken) {
      this.setState({
        isConnected: false,
      });

      return;
    }

    this.setState({
      accessToken,
      refreshToken,
    });

    const player = await this.init();

    this.setState({
      player,
      isConnected: true,
    });
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

  onPlayerReady: Spotify.PlaybackInstanceListener = (instance) => {
    this.setState({instance});
  }

  onStateChange: Spotify.PlaybackStateListener = (state) => {
    this.setState({state});
  }

  onSdkReady = async () => {
    const player: Spotify.SpotifyPlayer = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: this.getToken,
    });
  
    player.addListener('initialization_error', this.handleError);
    player.addListener('authentication_error', this.handleError);
    player.addListener('account_error', this.handleError);
    player.addListener('playback_error', this.handleError);

    player.addListener('player_state_changed', this.onStateChange);
    player.addListener('ready', this.onPlayerReady);
    player.addListener('not_ready', this.onPlayerReady);
  
    const isConnected = await player.connect();

    if (!isConnected) {
      this.reject && this.reject(new Error('Connection failed'));
    } else {
      this.resolve && this.resolve(player);
    }

    delete this.resolve;
    delete this.reject;    
  }
  
  async init(): Promise<Spotify.SpotifyPlayer> {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://sdk.scdn.co/spotify-player.js';

    document.body.append(script);

    this.script = script;

    window.onSpotifyWebPlaybackSDKReady = this.onSdkReady;

    return new Promise<Spotify.SpotifyPlayer>((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
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

      localStorage.setItem('spotifyAccessToken', accessToken);
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
    localStorage.removeItem('spotifyAccessToken');
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
    const {player, isConnected} = this.state;

    const value: SpotifyCtx = {
      spotifyPlayer: isConnected ? player : undefined,
      isSpotifyPending: isConnected === undefined,
      connectSpotify: this.connect,
      disconnectSpotify: this.disconnect,
    }

    return (
      <SpotifyCtxProvider value={value}>
        {children}
      </SpotifyCtxProvider>
    )
  }
}

export {SpotifyProvider}
