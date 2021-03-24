import { deezerConfig } from 'consts';
import { toQueryString } from 'services/helpers';
import {
  DeezerUserResponse,
  DeezerUser,
  DeezerSearchOptions,
  DeezerSearchResult,
  DeezerAdvancedSearchOptions,
  DeezerSearchResponse,
  DeezerAdvancedTrackSearchOptions,
  DeezerTrackFull,
  DeezerApiResponse,
  DeezerAlbumFull,
  DeezerArtist,
  DeezerTrack,
  DeezerAlbum,
  DeezerPlaylistFull,
} from '../types';
import { getAdvancedSearchString } from './helpers';

const { connectionTimeout } = deezerConfig;

export class DeezerWebApi {
  constructor(public dz: DeezerSdk.DZ) {}

  init(options: DeezerSdk.InitOptions): Promise<DeezerSdk.SdkOptions | undefined> {
    this.dz.init(options);

    return new Promise<DeezerSdk.SdkOptions | undefined>((resolve, reject) => {
      const timerId = setTimeout(() => {
        const dzIframe = document.querySelector('#dzplayer');

        if (!dzIframe) {
          reject(new Error('Connection timeout'));
        } else {
          resolve(undefined);
        }
      }, connectionTimeout);

      this.dz.ready(response => {
        clearTimeout(timerId);

        resolve(response);
      });
    });
  }

  login(): Promise<DeezerSdk.LoginResponse> {
    return new Promise<DeezerSdk.LoginResponse>((resolve, reject) => {
      const timerId = setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, connectionTimeout);

      this.dz.login(response => {
        const { authResponse } = response;

        clearTimeout(timerId);

        if (authResponse && authResponse.accessToken) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  isLoggedIn(): Promise<boolean> {
    return new Promise(resolve => {
      const timerId = setTimeout(() => {
        resolve(false);
      }, connectionTimeout);

      this.dz.getLoginStatus(response => {
        const { authResponse } = response;

        clearTimeout(timerId);
        resolve(!!authResponse && !!authResponse.accessToken);
      });
    });
  }

  logout(): void {
    this.dz.logout();
  }

  me(): Promise<DeezerUser> {
    return new Promise((res, rej) => {
      this.dz.api('/user/me', (response: DeezerUserResponse) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  advancedSearch({
    strict,
    order,
    namespace,
    limit,
    index,
    query,
  }: DeezerAdvancedSearchOptions): Promise<DeezerSearchResult> {
    const queryString = toQueryString({
      q: getAdvancedSearchString(query),
      strict: strict ? 'on' : undefined,
      order,
      limit,
      index,
    });

    return new Promise<DeezerSearchResult>((res, rej) => {
      this.dz.api(`/search/${namespace}${queryString}`, (response: DeezerSearchResponse) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  search(options: DeezerSearchOptions): Promise<DeezerSearchResult> {
    if (typeof options.query !== 'string') {
      return this.advancedSearch(options as DeezerAdvancedTrackSearchOptions);
    }

    const { namespace, strict, order, limit, index, query } = options;

    const queryString = toQueryString({
      q: query,
      strict: strict ? 'on' : undefined,
      order,
      limit,
      index,
    });

    return new Promise((res, rej) => {
      this.dz.api(`/search/${namespace}${queryString}`, (response: DeezerSearchResponse) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getTrack(id: number): Promise<DeezerTrackFull> {
    return new Promise((res, rej) => {
      this.dz.api(`/track/${id}`, (response: DeezerApiResponse<DeezerTrackFull>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getAlbum(id: number): Promise<DeezerAlbumFull> {
    return new Promise((res, rej) => {
      this.dz.api(`/album/${id}`, (response: DeezerApiResponse<DeezerAlbumFull>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getArtist(id: number): Promise<DeezerArtist> {
    return new Promise((res, rej) => {
      this.dz.api(`/artist/${id}`, (response: DeezerApiResponse<DeezerArtist>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getArtistTopTracks(id: number): Promise<DeezerTrack[]> {
    return new Promise((res, rej) => {
      this.dz.api(`/artist/${id}/top`, (response: DeezerApiResponse<DeezerTrack[]>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getArtistAlbums(id: number): Promise<DeezerAlbum[]> {
    return new Promise((res, rej) => {
      this.dz.api(`/artist/${id}/albums`, (response: DeezerApiResponse<DeezerAlbum[]>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getArtistRelated(id: number): Promise<DeezerArtist[]> {
    return new Promise((res, rej) => {
      this.dz.api(`/artist/${id}/related`, (response: DeezerApiResponse<DeezerArtist[]>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getPlaylist(id: number): Promise<DeezerPlaylistFull> {
    return new Promise((res, rej) => {
      this.dz.api(`/playlist/${id}`, (response: DeezerApiResponse<DeezerPlaylistFull>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getTrackByIsrc(isrc: string): Promise<DeezerTrackFull> {
    return new Promise((res, rej) => {
      this.dz.api(`/track/isrc:${isrc}`, (response: DeezerApiResponse<DeezerTrackFull>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }

  getAlbumByUpc(upc: string): Promise<DeezerAlbumFull> {
    return new Promise((res, rej) => {
      this.dz.api(`/album/upc:${upc}`, (response: DeezerApiResponse<DeezerAlbumFull>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response);
        }
      });
    });
  }
}
