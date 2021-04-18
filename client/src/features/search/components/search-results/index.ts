import { connect } from 'react-redux';
import { AppState } from '@app/state';
import {
  selectResultsPage,
  selectSearchError,
  selectIsSearchPending,
} from '@app/state/search/selectors';

import { SearchResultsComponent } from './search-results';
import { SearchResult } from '@app/state/search/types';

const mapStateToProps = (
  state: AppState,
): {
  currentPage: SearchResult[] | undefined;
  error: Error | undefined;
  isPending: boolean;
} => ({
  currentPage: selectResultsPage(state),
  error: selectSearchError(state),
  isPending: selectIsSearchPending(state),
});

export const SearchResults = connect(mapStateToProps, {})(SearchResultsComponent);
