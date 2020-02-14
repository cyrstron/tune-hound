import {mountDeezerScript} from './helpers';
import {DeezerWebApi} from './deezer-web-api';

export class DeezerService {
  script?: HTMLScriptElement;
  root?: HTMLDivElement;

  api?: DeezerWebApi;

  onLogout?: () => void;

  async mount(options: DeezerSdk.InitOptions) {
    const {script, root, DZ} = await mountDeezerScript();

    this.api = new DeezerWebApi(DZ);

    this.script = script;
    this.root = root;

    const response = await this.api.init(options);

    return response;
  }

  async connect() {
    return this.api && this.api.login();
  }

  disconnect() {
    this.api && this.api.logout();
  }

  unmount() {
    this.script && this.script.remove();
    this.root && this.root.remove();
  }

  get isMounted() {
    return !!this.script;
  }

  async isLoggedIn(): Promise<boolean> {
    return !!this.api && this.api.isLoggedIn();
  }
}
