import { connect } from 'react-redux';
import { AppState } from '@app/state';
import {executeSearch} from '@app/state/search';

import {SearchComponent} from './search';

const mapStateToProps = (state: AppState) => ({

});

const Search = connect(mapStateToProps, {
  executeSearch
})(SearchComponent);

export {Search};
