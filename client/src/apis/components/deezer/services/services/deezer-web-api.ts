export class DeezerWebApi {
  constructor(
    public dz: DeezerSdk.DZ,
  ) {}

  async init(options: DeezerSdk.InitOptions) {    
    await new Promise((res) => {
      window.DZ.init({
        ...options,
        player: {
          onload: res,
        }
      });

    })

    return new Promise<DeezerSdk.SdkOptions>((resolve) => {
      window.DZ.ready((response) => {
        setTimeout(() => {
          resolve(response);
        }, 1000);
      });
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