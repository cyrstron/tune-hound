import { AxiosInstance, AxiosStatic } from "axios";

export interface SpotifyAuthPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  scope: string;
}

export class SpotifyWebApi {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: Date;
  scope?: string;

  constructor(
    public axios: AxiosInstance, 
    authTokens?: SpotifyAuthPayload
  ) {
    authTokens && this.setAuthTokens(authTokens);
  }

  async getCurrentUser(): Promise<SpotifyApi.CurrentUsersProfileResponse> {
    await this.checkAccessToken();

    const {data} = await this.axios.get<SpotifyApi.CurrentUsersProfileResponse>('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    return data;
  }

  async setActiveDevice(deviceId: string): Promise<void> {
    await this.checkAccessToken();

    await this.axios.put<void>('https://api.spotify.com/v1/me/player', {
      device_ids: [deviceId],
      play: true,
    }, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`
      }
    });
  }

  async setAuthTokens({
    refreshToken,
    accessToken,
    expiresIn,
    scope,
  }: SpotifyAuthPayload) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.scope = scope;

    if (expiresIn < new Date()) {
      await this.refreshAccessToken();
    }
  }


  async login() {
    window.open('/login-spotify');

    const {
      expiresIn, 
      ...authTokens
    } = await new Promise<SpotifyAuthPayload>((res, rej) => {
      const onMessage = (e: MessageEvent) => {
        const {spotifyAuth} = e.data as {
          spotifyAuth?: {
            error: string
          } | SpotifyAuthPayload
        }; 

        if (!spotifyAuth) return;

        window.removeEventListener('message', onMessage);

        if ('error' in spotifyAuth) {
          rej(new Error(spotifyAuth.error));
        } else {
          res(spotifyAuth);
        }
      };

      window.addEventListener('message', onMessage);
    });

    this.setAuthTokens({
      ...authTokens, 
      expiresIn: new Date(expiresIn)
    });
  }

  resetAuthTokens() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.expiresIn = undefined;
    this.scope = undefined;
  }

  async refreshAccessToken(): Promise<void> {
    this.checkRefreshToken();

    const {
      data: {
        'access_token': accessToken, 
        'expires_in': expiresIn
      }
    } = await this.axios.get<{
      'access_token': string,
      'expires_in': number,
    }>(`/refresh-token?refresh_token=${this.refreshToken}`);

    this.accessToken = accessToken;
    this.expiresIn = new Date(expiresIn);
  }

  async checkAccessToken(): Promise<void> {
    if (!this.accessToken) throw new Error('Spotify loggin in required!');

    if (this.expiresIn! < new Date()) {
      await this.refreshAccessToken();
    }
  }

  checkRefreshToken() {
    if(!this.refreshToken) throw new Error('Spotify loggin in required!');
  }

  getAuthTokens(): SpotifyAuthPayload | undefined {
    if (
      !this.accessToken ||
      !this.refreshToken ||
      !this.expiresIn ||
      !this.scope
    ) return;

    return {
      refreshToken: this.refreshToken,
      expiresIn: this.expiresIn,
      accessToken: this.accessToken,
      scope: this.scope,
    };
  }
}