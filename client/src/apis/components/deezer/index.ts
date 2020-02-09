import { createContext } from 'react';
import { DeezerService } from './services/deezer-service';

export {DeezerProvider} from './deezer-provider';
export {withDeezer} from './hocs/with-deezer'

export interface DeezerCtx {
  dz?: DeezerService;
  connectDeezer: () => Promise<void>;
  disconnectDeezer: () => void;
  isDeezerPending: boolean;
}

export const deezerCtx = createContext<DeezerCtx | undefined>(undefined);
export const DeezerCtxProvider = deezerCtx.Provider;
export const DeezerCtxConsumer = deezerCtx.Consumer;

declare global {
  interface Window {
    DZ: DeezerSdk.DZ;
    dzAsyncInit?: () => void;
  }
}