import { connect } from 'react-redux';
import { AppState } from '@app/state';
import {
  selectTotalPages,
  selectResultsPage,
  selectPageIndex, 
  selectSearchError,
  selectIsSearchPending
} from '@app/state/search/selectors';
import {
  setSearchPageIndex
} from '@app/state/search/actions';

import {SearchResultsComponent} from './search-results';

const mapStateToProps = (state: AppState) => ({
  totalPages: selectTotalPages(state),
  pageIndex: selectPageIndex(state),
  currentPage: selectResultsPage(state),
  error: selectSearchError(state),
  isPending: selectIsSearchPending(state),
});

export const SearchResults = connect(mapStateToProps, {
  setPage: setSearchPageIndex,
})(SearchResultsComponent);