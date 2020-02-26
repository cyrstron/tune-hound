import {connect} from 'react-redux';
import {FlashPopupComponent, FlashPopupProps} from './flash-popup';
import {AppState} from '@app/state';
import {
  selectFlashEnabled, 
  selectFlashMsgIgnored, 
  selectDeezerIsConnected,
  setFlashIgnored,
  selectDeezerIsPremium
} from '@app/state/deezer';

const mapStateToProps = (state: AppState) => ({
  isEnabled: selectFlashEnabled(state),
  isIgnored: selectFlashMsgIgnored(state),
  isConnected: selectDeezerIsConnected(state),
  isPremium: selectDeezerIsPremium(state),
});

const FlashPopup = connect(mapStateToProps, {
  setIgnored: setFlashIgnored,
})(FlashPopupComponent);

export {FlashPopup};
