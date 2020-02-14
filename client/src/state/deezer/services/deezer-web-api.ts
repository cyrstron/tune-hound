export class DeezerWebApi {
  constructor(
    public dz: DeezerSdk.DZ,
  ) {}

  async init(options: DeezerSdk.InitOptions) {    
    this.dz.init(options);

    return new Promise<DeezerSdk.SdkOptions>((resolve) => {
      this.dz.ready((response) => {
        resolve(response);
      });
    });
  }

  async login(): Promise<DeezerSdk.LoginResponse> {
    return new Promise<DeezerSdk.LoginResponse>((resolve, reject) => {
      this.dz.login((response) => {
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