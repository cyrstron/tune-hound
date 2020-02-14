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
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: AppState) => ({
  isDeezerConnected: selectDeezerIsConnected(state),
  wasDeezerConnected: selectDeezerWasConnected(state),
  isDeezerPending: selectDeezerPending(state),
  deezerError: selectDeezerError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connectDeezer: () => {
    const action = connectDeezer();

    dispatch(action);
  },
  disconnectDeezer: () => {
    const action = disconnectDeezer();

    dispatch(action);
  },
})

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);