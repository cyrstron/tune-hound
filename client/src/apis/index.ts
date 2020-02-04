import { SpotifyCtx } from "./components/spotify";
import { DeezerCtx } from "./components/deezer";

export type ApisCtx = SpotifyCtx & DeezerCtx;

export {ApisProvider} from './apis-provider';
export {withApis} from './hocs/with-apis';

