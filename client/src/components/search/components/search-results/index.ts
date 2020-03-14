import { connect } from 'react-redux';
import { AppState } from '@app/state';
import {
  selectResultsPage,
  selectSearchError,
  selectIsSearchPending
} from '@app/state/search/selectors';

import {SearchResultsComponent} from './search-results';

const mapStateToProps = (state: AppState) => ({
  currentPage: selectResultsPage(state),
  error: selectSearchError(state),
  isPending: selectIsSearchPending(state),
});

export const SearchResults = connect(mapStateToProps, {})(SearchResultsComponent);