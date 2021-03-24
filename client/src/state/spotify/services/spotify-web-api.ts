import { AxiosInstance } from 'axios';
import { SpotifySearchOptions } from '../types';
import { getAdvancedSearchString } from './helpers';

export interface SpotifyAuthPayload {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  scope: string;
}

export class SpotifyWebApi {
  spotifyUrl = 'https://api.spotify.com';

  constructor(public axios: AxiosInstance) {}

  async getCurrentUser(accessToken: string): Promise<SpotifyApi.CurrentUsersProfileResponse> {
    const { data } = await this.axios.get<SpotifyApi.CurrentUsersProfileResponse>(
      `${this.spotifyUrl}/v1/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async playTrackById(deviceId: string, id: string, accessToken: string): Promise<void> {
    await this.axios.put(
      `${this.spotifyUrl}/v1/me/player/play?device_id=${deviceId}`,
      { uris: [`spotify:track:${id}`] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  async setActiveDevice(deviceId: string, accessToken: string, play = false): Promise<void> {
    await this.axios.put<void>(
      `${this.spotifyUrl}/v1/me/player`,
      {
        device_ids: [deviceId],
        play,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  async search(
    { query, includeExternal, ...params }: SpotifySearchOptions,
    accessToken: string,
  ): Promise<SpotifyApi.SearchResponse> {
    const { data } = await this.axios.get<SpotifyApi.SearchResponse>(
      `${this.spotifyUrl}/v1/search`,
      {
        params: {
          ...params,
          include_external: includeExternal,
          q: typeof query === 'string' ? query : getAdvancedSearchString(query),
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async login(): Promise<{
    expiresIn: Date;
    accessToken: string;
    refreshToken: string;
    scope: string;
  }> {
    window.open('/login-spotify');

    const { expiresIn, ...authTokens } = await new Promise<SpotifyAuthPayload>((res, rej) => {
      const onMessage = (e: MessageEvent): void => {
        const { spotifyAuth } = e.data as {
          spotifyAuth?:
            | {
                error: string;
              }
            | SpotifyAuthPayload;
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
      expiresIn: new Date(expiresIn),
    };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{
    accessToken: string;
    expiresIn: Date;
  }> {
    const {
      data: { accessToken, expiresIn },
    } = await this.axios.get<{
      accessToken: string;
      expiresIn: number;
    }>(`/refresh-token?refresh_token=${refreshToken}`);

    return {
      accessToken,
      expiresIn: new Date(expiresIn),
    };
  }

  async getAlbum(id: string, accessToken: string): Promise<SpotifyApi.AlbumObjectFull> {
    const { data } = await this.axios.get<SpotifyApi.AlbumObjectFull>(
      `${this.spotifyUrl}/v1/albums/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getAlbumTracks(id: string, accessToken: string): Promise<SpotifyApi.AlbumTracksResponse> {
    const { data } = await this.axios.get<SpotifyApi.AlbumTracksResponse>(
      `${this.spotifyUrl}/v1/albums/${id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getTrack(id: string, accessToken: string): Promise<SpotifyApi.TrackObjectFull> {
    const { data } = await this.axios.get<SpotifyApi.TrackObjectFull>(
      `${this.spotifyUrl}/v1/tracks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getArtist(id: string, accessToken: string): Promise<SpotifyApi.ArtistObjectFull> {
    const { data } = await this.axios.get<SpotifyApi.ArtistObjectFull>(
      `${this.spotifyUrl}/v1/artists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getArtistAlbums(
    id: string,
    accessToken: string,
  ): Promise<SpotifyApi.ArtistsAlbumsResponse> {
    const { data } = await this.axios.get<SpotifyApi.ArtistsAlbumsResponse>(
      `${this.spotifyUrl}/v1/artists/${id}/albums`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getArtistTopTracks(
    id: string,
    accessToken: string,
    country = 'from_token',
  ): Promise<SpotifyApi.ArtistsTopTracksResponse> {
    const { data } = await this.axios.get<SpotifyApi.ArtistsTopTracksResponse>(
      `${this.spotifyUrl}/v1/artists/${id}/top-tracks`,
      {
        params: {
          country,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getArtistRelated(
    id: string,
    accessToken: string,
  ): Promise<SpotifyApi.ArtistsRelatedArtistsResponse> {
    const { data } = await this.axios.get<SpotifyApi.ArtistsRelatedArtistsResponse>(
      `${this.spotifyUrl}/v1/artists/${id}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getPlaylist(id: string, accessToken: string): Promise<SpotifyApi.PlaylistObjectFull> {
    const { data } = await this.axios.get<SpotifyApi.PlaylistObjectFull>(
      `${this.spotifyUrl}/v1/playlists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getPlaylistTracks(
    id: string,
    accessToken: string,
  ): Promise<SpotifyApi.PlaylistTrackResponse> {
    const { data } = await this.axios.get<SpotifyApi.PlaylistTrackResponse>(
      `${this.spotifyUrl}/v1/playlists/${id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async getPlaylistImages(id: string, accessToken: string): Promise<SpotifyApi.ImageObject[]> {
    const { data } = await this.axios.get<SpotifyApi.ImageObject[]>(
      `${this.spotifyUrl}/v1/playlists/${id}/images`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }
}
