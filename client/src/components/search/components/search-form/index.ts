import { connect } from 'react-redux';
import { AppState } from '@app/state';
import {executeSearch} from '@app/state/search';

import {SearchFormComponent} from './search-form';

const mapStateToProps = (state: AppState) => ({

});

const SearchForm = connect(mapStateToProps, {
  executeSearch
})(SearchFormComponent);

export {SearchForm};
