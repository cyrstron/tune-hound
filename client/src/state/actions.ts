import { PlayerAction } from './player/actions';
import { SpotifyAction } from './spotify';
import { DeezerAction } from './deezer';
import { SearchAction } from './search';
import { AudioAction } from './audio-player';
import { RootAction } from './root';

export type AppAction =
  | RootAction
  | PlayerAction
  | SpotifyAction
  | DeezerAction
  | SearchAction
  | AudioAction;
