import { useFeatureInit } from '@app/hooks/use-feature-init';
import React, { FC } from 'react';
import { searchSaga } from './sagas';
import { SearchComponent, SearchProps } from './search-component';
import { searchReducer } from './state';

const SearchFeature: FC<SearchProps> = props => {
  useFeatureInit({
    saga: searchSaga,
    state: {
      path: 'search',
      reducer: searchReducer,
    },
  });

  return <SearchComponent {...props} />;
};

export default SearchFeature;
