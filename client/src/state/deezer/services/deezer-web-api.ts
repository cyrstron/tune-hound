import {deezerConfig} from 'consts';
import {toQueryString} from 'services/helpers';
import {
  DeezerUserResponse, 
  DeezerUser, 
  DeezerSearchOptions, 
  DeezerTrackSearchResult,
  DeezerSearchResult,
  DeezerAdvancedSearchOptions,
  DeezerSearchResponse,
  DeezerAdvancedTrackSearchOptions
} from '../types';
import {getAdvancedSearchString } from './helpers';

const {connectionTimeout} = deezerConfig;

export class DeezerWebApi {
  constructor(
    public dz: DeezerSdk.DZ,
  ) {}

  init(options: DeezerSdk.InitOptions) {    
    this.dz.init(options);

    return new Promise<DeezerSdk.SdkOptions>((resolve, reject) => {
      const timerId = setTimeout(() => {
        const dzIframe = document.querySelector('#dzplayer');

        if (!dzIframe) {
          reject(new Error('Connection timeout'));
        } else {
          resolve();
        }
      }, connectionTimeout);

      this.dz.ready((response) => {
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

      this.dz.login((response) => {
        const {authResponse} = response;

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
    return new Promise((resolve) => {
      const timerId = setTimeout(() => {
        resolve(false);
      }, connectionTimeout);

      this.dz.getLoginStatus((response) => {
        const {authResponse} = response;

        clearTimeout(timerId);
        resolve(!!authResponse && !!authResponse.accessToken);
      });
    })
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
    })
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
    })
  }

  search(options: DeezerSearchOptions): Promise<DeezerSearchResult> {
    if (typeof options.query !== 'string') {
      return this.advancedSearch(options as DeezerAdvancedTrackSearchOptions);
    }

    const {namespace, strict, order, limit, index, query} = options;

    const queryString = toQueryString({
      q: query,
      strict: strict ? 'on' : undefined,
      order,
      limit,
      index,
    });

    return new Promise((res, rej) => {
      this.dz.api(
        `/search/${namespace}${queryString}`,
        (response: DeezerSearchResponse) => {
          if ('error' in response) {
            rej(response.error);
          } else {
            res(response);
          }
        },
      );
    });
  }
}