import { AxiosInstance } from "axios";

export class SpotifyService {
  script


  constructor(
    public axios: AxiosInstance,

  ) {

  }

  mount() {
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
}