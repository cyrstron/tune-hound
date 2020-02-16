import {deezerConfig} from 'consts';
import {toQueryString} from 'services/helpers';
import {
  DeezerUserResponse, 
  DeezerUser, 
  DeezerTrackSearchResponse, 
  DeezerTrack, 
  DeezerSearchOptions, 
  DeezerApiResponse, 
  DeezerTrackSearchOptions
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
        reject(new Error('Connection timeout'));
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
      this.dz.getLoginStatus((response) => {
        const {authResponse} = response;

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

  searchTrack(query: string, {
    strict,
    order,
    ...advancedProps
  }: DeezerTrackSearchOptions = {}): Promise<DeezerTrack[]> {
    const queryString = toQueryString({
      q: getAdvancedSearchString(query, advancedProps),
      strict: strict ? 'on' : undefined,
      order,
    });

    return new Promise((res, rej) => {
      this.dz.api(`/search${queryString}`, (response: DeezerTrackSearchResponse) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response.data);
        }
      });
    })
  }

  search(
    query: string,  
    options: DeezerSearchOptions = {}
  ) {
    if (!('namespace' in options)) {
      return this.searchTrack(query, options);
    }

    const {namespace, strict, order} = options;

    const queryString = toQueryString({
      strict: strict ? 'on' : undefined,
      order,
    });

    return new Promise((res, rej) => {
      this.dz.api(`/search/${namespace}${queryString}`, (response: DeezerApiResponse<{data: any}>) => {
        if ('error' in response) {
          rej(response.error);
        } else {
          res(response.data);
        }
      });
    });
  }
}