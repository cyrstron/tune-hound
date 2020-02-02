import { createContext } from 'react';

export {DeezerProvider} from './deezer-provider';

export const DeezerCtx = createContext<DeezerSdk.DZ | undefined>(undefined);
export const DeezerCtxProvider = DeezerCtx.Provider;
export const DeezerCtxConsumer = DeezerCtx.Consumer;

declare global {
  interface Window {
    DZ: DeezerSdk.DZ;
    dzAsyncInit: () => void;
  }
}