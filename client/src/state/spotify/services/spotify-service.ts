import {SpotifyWebApi} from './spotify-web-api';
import {mountSpotifyScript} from './helpers';
import {SpotifySearchOptions} from '../types';

export interface SpotifyServiceHandlets {
  onError: Spotify.ErrorListener;
  onStateChange: Spotify.PlaybackStateListener;
  onReady: (instance: Spotify.WebPlaybackInstance) => void;
  onNotReady: (instance: Spotify.WebPlaybackInstance) => void;
}

export class SpotifyService {
  script?: HTMLScriptElement;
  spotify?: typeof Spotify;

  private spotifyPlayer?: Spotify.SpotifyPlayer;

  constructor(
    public api: SpotifyWebApi,
  ) {}

  async mount(): Promise<void> {
    const {script, spotify} = await mountSpotifyScript();

    this.script = script;
    this.spotify = spotify;
  }

  initPlayer(
    getToken: (callback: (token: string) => void) => void,
  ): void {
    if (!this.spotify) {
      throw new Error('Spotify wasn\'t mounted');
    }

    this.spotifyPlayer = new window.Spotify.Player({
      name: 'Tune Hound Preview Player',
      getOAuthToken: getToken,
    });
  }

  setActiveDevice(deviceId: string, accessToken: string): Promise<void> {
    return this.api.setActiveDevice(deviceId, accessToken);
  }

  async connect(): Promise<void> {
    const isConnected = await this.player.connect();

    if (!isConnected) {
      throw new Error('Connection failed');
    }
  }

  getState(): Promise<Spotify.PlaybackState | null> {
    return this.player.getCurrentState();
  }

  disconnect(): void {
    this.spotifyPlayer?.disconnect();
  }

  unmount(): void {
    this.script?.remove();
  }

  search(options: SpotifySearchOptions, accessToken: string): Promise<SpotifyApi.SearchResponse> {
    return this.api.search(options, accessToken);
  }

  get player(): Spotify.SpotifyPlayer {
    if (!this.spotifyPlayer) throw new Error('Spotify Player wasn\'t initialized');

    return this.spotifyPlayer;
  }
}
