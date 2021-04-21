import { connect } from 'react-redux';
import { AppState } from '@app/state';
import { executeSearch } from '@app/features/search/search';

import { SearchFormComponent } from './search-form';
import { selectIsSpotifyConnected } from '@app/state/spotify';
import { selectDeezerIsConnected } from '@app/state/deezer';

const mapStateToProps = (
  state: AppState,
): {
  isSpotifyConnected: boolean;
  isDeezerConnected: boolean;
} => ({
  isSpotifyConnected: selectIsSpotifyConnected(state),
  isDeezerConnected: selectDeezerIsConnected(state),
});

const SearchForm = connect(mapStateToProps, {
  executeSearch,
})(SearchFormComponent);

export { SearchForm };
