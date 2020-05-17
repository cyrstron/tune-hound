import {SpotifyWebApi} from './spotify-web-api';
import {mountSpotifyScript} from './helpers';
import { SpotifySearchOptions } from '../types';

export interface SpotifyServiceHandlets {
  onError: Spotify.ErrorListener,
  onStateChange: Spotify.PlaybackStateListener,
  onReady: (instance: Spotify.WebPlaybackInstance) => void,
  onNotReady: (instance: Spotify.WebPlaybackInstance) => void,
}

export class SpotifyService {
  script?: HTMLScriptElement;
  spotify?: typeof Spotify;

  spotifyPlayer?: Spotify.SpotifyPlayer;

  constructor(
    public api: SpotifyWebApi, 
  ) {}

  async mount() {
    const {script, spotify} = await mountSpotifyScript();

    this.script = script;
    this.spotify = spotify;
  }

  initPlayer(
    getToken: (callback: (token: string) => void) => void,
  ) {
    if (!this.spotify) {
      throw new Error('Spotify wasn\'t mounted');
    }

    this.spotifyPlayer = new window.Spotify.Player({
      name: 'Tune Hound Preview Player',
      getOAuthToken: getToken,
    });
  }

  setActiveDevice(deviceId: string, accessToken: string) {
    return this.api.setActiveDevice(deviceId, accessToken);
  }

  async connect() {
    const {player} = this;

    if (!player) {
      throw new Error('Player wasn\'t mounted');
    };

    const isConnected = await player.connect();

    if (!isConnected) {
      throw new Error('Connection failed');
    }
  }

  getState() {
    const {player} = this;

    if (!player) {
      throw new Error('Player wasn\'t mounted');
    };

    return player.getCurrentState();
  }

  disconnect() {
    this.player && this.player.disconnect();
  }

  unmount() {
    this.script && this.script.remove();
  }

  search(options: SpotifySearchOptions, accessToken: string) {
    return this.api.search(options, accessToken);
  }

  get player(): Spotify.SpotifyPlayer {
    if (!this.spotifyPlayer) throw new Error('Spotify Player wasn\'t initialized')

    return this.spotifyPlayer;
  }
}