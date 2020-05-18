import {mountDeezerScript} from './helpers';
import {DeezerWebApi} from './deezer-web-api';
import {DeezerSearchOptions, DeezerUser, DeezerSearchResult} from '../types';
import {DeezerPlayer} from './deezer-player';

export class DeezerService {
  script?: HTMLScriptElement;
  root?: HTMLDivElement;

  private webApi?: DeezerWebApi;
  private playerService?: DeezerPlayer;
  private deezerEvent?: DeezerSdk.Event;

  onLogout?: () => void;

  async mount(): Promise<void> {
    const {script, root, DZ} = await mountDeezerScript();

    this.webApi = new DeezerWebApi(DZ);
    this.playerService = new DeezerPlayer(DZ.player);
    this.deezerEvent = DZ.Event;

    this.script = script;
    this.root = root;
  }

  async init(options: DeezerSdk.InitOptions): Promise<DeezerSdk.SdkOptions> {
    const response = await this.api.init(options);

    return response;
  }

  async me(): Promise<DeezerUser> {
    const response = await this.api.me();

    return response;
  }

  async connect(): Promise<DeezerSdk.LoginResponse> {
    return this.api && this.api.login();
  }

  disconnect(): void {
    this.api && this.api.logout();
  }

  unmount(): void {
    this.script && this.script.remove();
    this.root && this.root.remove();
  }

  get isMounted(): boolean {
    return !!this.script;
  }

  async isLoggedIn(): Promise<boolean> {
    return !!this.api && this.api.isLoggedIn();
  }

  search(options: DeezerSearchOptions): Promise<DeezerSearchResult> {
    return this.api.search(options);
  }

  get api(): DeezerWebApi {
    if (!this.webApi) throw new Error('Deezer API is not mounted');

    return this.webApi;
  }

  get events(): DeezerSdk.Event {
    if (!this.deezerEvent) throw new Error('Deezer API is not mounted');

    return this.deezerEvent;
  }


  get player(): DeezerPlayer {
    if (!this.playerService) throw new Error('Deezer Player is not mounted');

    return this.playerService;
  }
}
