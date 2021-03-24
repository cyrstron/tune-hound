import { INIT_APP } from './consts';
import { PlayerAction } from './player/actions';
import { SpotifyAction } from './spotify';
import { DeezerAction } from './deezer';
import { SearchAction } from './search';
import { AudioAction } from './audio-player';

export interface InitAppAction {
  type: typeof INIT_APP;
}

export const initApp = (): InitAppAction => ({
  type: INIT_APP,
});

export type AppAction = PlayerAction | SpotifyAction | DeezerAction | SearchAction | AudioAction;
