import { combineReducers } from 'redux';
import { queryReducer } from './query';
import { searchResultsReducer } from './results';

export const searchReducer = combineReducers({
  query: queryReducer,
  results: searchResultsReducer,
});
