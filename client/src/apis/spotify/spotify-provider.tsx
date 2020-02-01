import React, { Component } from "react";
import { SpotifyCtxProvider } from "../spotify";

export interface SpotifyProviderProps {
  token: string;
}

export interface SpotifyProviderState {
  isConnected?: boolean;
  player?: Spotify.SpotifyPlayer;
  instance?: Spotify.WebPlaybackInstance;
  state?: Spotify.PlaybackState;
  error?: Spotify.Error;
}

class SpotifyProvider extends Component<SpotifyProviderProps, SpotifyProviderState> {
  state: SpotifyProviderState = {};
  script?: HTMLScriptElement;

  getToken = (
    callback: (token: string) => void
  ) => {
    const {token} = this.props;

    callback(token); 
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
    const player: Spotify.SpotifyPlayer = new Spotify.Player({
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

    this.setState({isConnected, player})
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = this.onSdkReady;

    this.script = document.createElement('script');

    this.script.type = 'text/javascript';
    this.script.src = 'https://sdk.scdn.co/spotify-player.js';

    document.body.append(this.script);
  }

  componentWillUnmount() {
    this.script && this.script.remove();

    delete window.onSpotifyWebPlaybackSDKReady;
  }

  render() {
    const {children} = this.props;
    const {player, isConnected} = this.state;

    return (
      <SpotifyCtxProvider value={isConnected ? player : undefined}>
        {children}
      </SpotifyCtxProvider>
    )
  }
}

export {SpotifyProvider}
