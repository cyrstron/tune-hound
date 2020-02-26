import { AxiosInstance } from "axios";

export interface SpotifyAuthPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  scope: string;
}

export class SpotifyWebApi {
  spotifyUrl = 'https://api.spotify.com';

  constructor(
    public axios: AxiosInstance
  ) {}

  async getCurrentUser(accessToken: string): Promise<SpotifyApi.CurrentUsersProfileResponse> {
    const {data} = await this.axios.get<SpotifyApi.CurrentUsersProfileResponse>(`${this.spotifyUrl}/v1/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return data;
  }

  async setActiveDevice(deviceId: string, accessToken: string): Promise<void> {
    await this.axios.put<void>(`${this.spotifyUrl}/v1/me/player`, {
      device_ids: [deviceId],
      play: true,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
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

    return {
      ...authTokens, 
      expiresIn: new Date(expiresIn)
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const {
      data: {
        'access_token': accessToken, 
        'expires_in': expiresIn
      }
    } = await this.axios.get<{
      'access_token': string,
      'expires_in': number,
    }>(`/refresh-token?refresh_token=${refreshToken}`);

    return {
      accessToken,
      expiresIn,
    }
  }
}