import { createContext } from 'react';
import { AppState } from '@app/state';

import { DeezerService } from './services/deezer-service';
import {DeezerProviderComponent} from './deezer-provider';
import { connect } from 'react-redux';
import { 
  connectDeezer,
  disconnectDeezer,
  selectDeezerWasConnected,
  selectDeezerError, 
  selectDeezerPending,
} from '@app/state/deezer';

const mapStateToProps = (state: AppState) => ({
  wasConnected: selectDeezerWasConnected(state),
  error: selectDeezerError(state),
  isPending: selectDeezerPending(state),
});

export const DeezerProvider = connect(mapStateToProps, {
  connectDeezer,
  disconnectDeezer,
})(DeezerProviderComponent);

export interface DeezerCtx {
  dz?: DeezerService;
  connectDeezer: () => Promise<void>;
  disconnectDeezer: () => void;
  isDeezerPending: boolean;
}

export const deezerCtx = createContext<DeezerCtx | undefined>(undefined);
export const DeezerCtxProvider = deezerCtx.Provider;
export const DeezerCtxConsumer = deezerCtx.Consumer;

export {withDeezer} from './hocs/with-deezer';
