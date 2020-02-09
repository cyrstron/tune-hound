export class DeezerWebApi {
  constructor(
    public dz: DeezerSdk.DZ,
  ) {}

  async init(options: DeezerSdk.InitOptions): Promise<DeezerSdk.SdkOptions> {    
    window.DZ.init({
      ...options,
      player: {
        onload: () => {
          console.log('Player loaded')
        },
      }
    });
    return new Promise<DeezerSdk.SdkOptions>((resolve) => {
      window.DZ.ready(resolve);
    });
  }

  async login(): Promise<DeezerSdk.LoginResponse> {
    return new Promise<DeezerSdk.LoginResponse>((resolve, reject) => {
      window.DZ.login((response) => {
        const {authResponse} = response;

        if (authResponse && authResponse.accessToken) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });    
  }

  async isLoggedIn(): Promise<boolean> {
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

}