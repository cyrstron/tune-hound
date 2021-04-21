import React, { FC } from 'react';
import { Search, SearchProps } from './search';

const SearchFeature: FC<SearchProps> = props => {
  return <Search {...props} />;
};

export default SearchFeature;
