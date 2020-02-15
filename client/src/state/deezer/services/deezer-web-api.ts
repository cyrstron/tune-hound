import {deezerConfig} from 'consts';
import {DeezerUserResponse, DeezerUser} from '../types';

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
}