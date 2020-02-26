import {HeaderComponent} from './header';
import { AppState } from '@app/state';
import { 
  selectDeezerIsConnected,
  selectDeezerWasConnected,
  connectDeezer,
  disconnectDeezer,
  selectDeezerPending,
  selectDeezerError,
} from '@app/state/deezer';
import { 
  selectIsSpotifyConnected,
  selectSpotifyWasConnected,
  connectSpotify,
  disconnectSpotify,
  selectSpotifyConnectPending,
  selectSpotifyConnectError,
} from '@app/state/spotify';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => ({
  isDeezerConnected: selectDeezerIsConnected(state),
  wasDeezerConnected: selectDeezerWasConnected(state),
  isDeezerPending: selectDeezerPending(state),
  deezerError: selectDeezerError(state),
  spotifyError: selectSpotifyConnectError(state),
  isSpotifyPending: selectSpotifyConnectPending(state),
  wasSpotifyConnected: selectSpotifyWasConnected(state),
  isSpotifyConnected: selectIsSpotifyConnected(state),
});

export const Header = connect(mapStateToProps, {
  connectDeezer,
  disconnectDeezer,
  connectSpotify,
  disconnectSpotify,
})(HeaderComponent);
