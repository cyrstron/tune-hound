import { connect } from 'react-redux';
import { ActivePlayerPopupComponent } from './active-player-popup';
import { AppState } from '@app/state';
import {
  selectIsSpotifyPlayerActive,
  selectIsSpotifyPlayerMsgIgnored,
  selectIsSpotifyConnected,
  setSpotifyActivePlayerIgnored,
} from '@app/state/spotify';

const mapStateToProps = (state: AppState) => ({
  isActive: selectIsSpotifyPlayerActive(state),
  isIgnored: selectIsSpotifyPlayerMsgIgnored(state),
  isConnected: selectIsSpotifyConnected(state),
});

const ActivePlayerPopup = connect(mapStateToProps, {
  setIgnored: setSpotifyActivePlayerIgnored,
})(ActivePlayerPopupComponent);

export { ActivePlayerPopup };
