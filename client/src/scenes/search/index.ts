import {connect} from 'react-redux';
import {AppState} from '@app/state';
import {
  selectTotalPages,
  selectPageIndex,
  selectSearchError,
  selectIsSearchPending,
} from '@app/state/search/selectors';
import {
  executeSearchByPageIndex,
} from '@app/state/search/actions';

import {SearchComponent} from './search';
import {selectIsSpotifyConnected} from '@app/state/spotify';
import {selectDeezerIsConnected} from '@app/state/deezer';

const mapStateToProps = (state: AppState): {
  totalPages: number | undefined;
  pageIndex: number;
  error: Error | undefined;
  isPending: boolean;
  isSpotifyConnected: boolean;
  isDeezerConnected: boolean;
} => ({
  totalPages: selectTotalPages(state),
  pageIndex: selectPageIndex(state),
  error: selectSearchError(state),
  isPending: selectIsSearchPending(state),
  isSpotifyConnected: selectIsSpotifyConnected(state),
  isDeezerConnected: selectDeezerIsConnected(state),
});

export const Search = connect(mapStateToProps, {
  setPage: executeSearchByPageIndex,
})(SearchComponent);
