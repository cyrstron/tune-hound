import {SpotifyWebApi} from './services/spotify-web-api';
import { AxiosError } from 'axios';

export interface SpotifyServiceHandlets {
  onError: Spotify.ErrorListener,
  onStateChange: Spotify.PlaybackStateListener,
  onReady: (instance: Spotify.WebPlaybackInstance) => void,
  onNotReady: (instance: Spotify.WebPlaybackInstance) => void,
}

export class SpotifyService {
  script?: HTMLScriptElement;
  api: SpotifyWebApi;

  player?: Spotify.SpotifyPlayer;
  deviceId?: string;
  user?: SpotifyApi.CurrentUsersProfileResponse;

  resolve?: () => void;

  onError?: Spotify.ErrorListener;
  onStateChange?: Spotify.PlaybackStateListener;
  onReady?: (instance: Spotify.WebPlaybackInstance) => void;
  onNotReady?: (instance: Spotify.WebPlaybackInstance) => void;

  isConnected: boolean = false;
  isActive: boolean = false;
  isReady: boolean = false;

  constructor(
    api: SpotifyWebApi, 
  ) {
    this.api = api;
  }

  getToken = (
    callback: (token: string) => void
  ) => {
    const authTokens = this.api.getAuthTokens();

    if(!authTokens) return;

    callback(authTokens.accessToken); 
  }

  onSdkReady = () => {
    delete window.onSpotifyWebPlaybackSDKReady;

    this.resolve && this.resolve();
  }

  async mount(handlers: SpotifyServiceHandlets) {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://sdk.scdn.co/spotify-player.js';

    document.body.append(script);

    this.script = script;

    window.onSpotifyWebPlaybackSDKReady = this.onSdkReady;

    await new Promise<Spotify.SpotifyPlayer>((res, rej) => {
      script.onerror = (e) => {
        script.onerror = null;
        delete this.resolve;

        rej(e);
      };
      
      this.resolve = res;
    });

    delete this.resolve;

    this.player = new window.Spotify.Player({
      name: 'Tune Hound Preview Player',
      getOAuthToken: this.getToken,
    });

    await this.connect(handlers);
  }

  setDeviceId(deviceId: string) {
    this.deviceId = deviceId;
  }

  setCurrentUser(user: SpotifyApi.CurrentUsersProfileResponse) {
    this.user = user;
  }

  onPlayerReady = ({'device_id': deviceId}: Spotify.WebPlaybackInstance) => {
    this.isReady = true;

    this.setDeviceId(deviceId);
  }

  onPlayerNotReady = ({'device_id': deviceId}: Spotify.WebPlaybackInstance) => {
    this.setDeviceId(deviceId);
  }

  get isPremium(): boolean {
    return !!this.user && this.user.product === 'premium';
  }

  async connect({
    onReady,
    onError,
    onNotReady,
    onStateChange,
  }: SpotifyServiceHandlets) {
    const {player} = this;

    if (!player) return;

    this.onError = onError;
    this.onReady = onReady;
    this.onNotReady = onNotReady;
    this.onStateChange = onStateChange;

    const isConnected = await player.connect();

    if (!isConnected) {
      throw new Error('Connection failed');
    }

    player.addListener('ready', onReady!);
    player.addListener('not_ready', onNotReady!);
  
    player.addListener('initialization_error', onError!);
    player.addListener('authentication_error', onError!);
    player.addListener('account_error', onError!);
    player.addListener('playback_error', onError!);

    player.addListener('player_state_changed', onStateChange!);

    const [user, deviceId] = await Promise.all([
      this.api.getCurrentUser(),
      new Promise<string>((res) => { 
      const onInitReady = ({'device_id': deviceId}: Spotify.WebPlaybackInstance) => {
        res(deviceId);

        player.removeListener('ready', onInitReady);
        player.removeListener('not_ready', onInitReady);
      }

      player.addListener('ready', onInitReady);
      player.addListener('not_ready', onInitReady);
    })]);

    this.setDeviceId(deviceId);
    this.setCurrentUser(user);

    if (!this.isPremium) return;
    
    await this.api.setActiveDevice(this.deviceId!);

    this.isActive = true;
  }

  disconnect() {
    this.removeListeners();

    this.player && this.player.disconnect();
    this.player = undefined;
  }

  removeListeners() {
    if (!this.player) return;

    this.player.removeListener('initialization_error', this.onError);
    this.player.removeListener('authentication_error', this.onError);
    this.player.removeListener('account_error', this.onError);
    this.player.removeListener('playback_error', this.onError);
    this.player.removeListener('player_state_changed', this.onStateChange);
    this.player.removeListener('ready', this.onReady);
    this.player.removeListener('not_ready', this.onNotReady);
  }

  unmount() {
    this.script && this.script.remove();

    this.isConnected = false;
    this.isActive = false;
    this.isReady = false;
  }
}