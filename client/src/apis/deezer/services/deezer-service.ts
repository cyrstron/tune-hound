export class DeezerService {
  script?: HTMLScriptElement;
  root?: HTMLDivElement;

  onLogout?: () => void;

  constructor(
    public dz: DeezerSdk.DZ,
    onLogout?: () => void,
  ) {
    this.onLogout = onLogout;
  }

  async init(options: DeezerSdk.InitOptions): Promise<DeezerSdk.SdkOptions> {
    window.DZ.init(options);

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

  logout(): Promise<void> {
    this.onLogout && this.onLogout();

    return new Promise((res) => {
      this.dz.logout(res);
    });
  }
}
