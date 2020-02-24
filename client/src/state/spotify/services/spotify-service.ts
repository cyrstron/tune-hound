import {SpotifyWebApi} from './spotify-web-api';
import {mountSpotifyScript} from './helpers';

export interface SpotifyServiceHandlets {
  onError: Spotify.ErrorListener,
  onStateChange: Spotify.PlaybackStateListener,
  onReady: (instance: Spotify.WebPlaybackInstance) => void,
  onNotReady: (instance: Spotify.WebPlaybackInstance) => void,
}

export class SpotifyService {
  script?: HTMLScriptElement;
  spotify?: typeof Spotify;

  player?: Spotify.SpotifyPlayer;

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

    this.player = new window.Spotify.Player({
      name: 'Tune Hound Preview Player',
      getOAuthToken: getToken,
    });
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
}