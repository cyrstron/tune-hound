import {mountDeezerScript} from './helpers';
import {DeezerWebApi} from './deezer-web-api';
import { DeezerSearchOptions } from '../types';

export class DeezerService {
  script?: HTMLScriptElement;
  root?: HTMLDivElement;

  private webApi?: DeezerWebApi;

  onLogout?: () => void;

  async mount() {
    const {script, root, DZ} = await mountDeezerScript();

    this.webApi = new DeezerWebApi(DZ);

    this.script = script;
    this.root = root;
  }

  async init(options: DeezerSdk.InitOptions) {
    const response = await this.api.init(options);

    return response;
  }

  async me() {
    const response = await this.api.me();

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

  search(options: DeezerSearchOptions) {
    return this.api.search(options);
  }

  getTrack(id: number) {
    return this.api.getTrack(id);
  }

  getAlbum(id: number) {
    return this.api.getAlbum(id);
  }

  getArtist(id: number) {
    return this.api.getArtist(id);
  }

  getArtistTopTracks(id: number) {
    return this.api.getArtistTopTracks(id);
  }

  getArtistAlbums(id: number) {
    return this.api.getArtistAlbums(id);
  }

  getArtistRelated(id: number) {
    return this.api.getArtistRelated(id);
  }

  getPlaylist(id: number) {
    return this.api.getPlaylist(id);
  }

  get api(): DeezerWebApi {
    if (!this.webApi) throw new Error('Deezer API is not mounted');

    return this.webApi;
  }
}
