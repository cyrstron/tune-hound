import React, { FC, lazy, Suspense } from 'react';
import { SearchProps } from './search-component';

const SearchFeature = lazy(() => import('./search-feature'));

const Search: FC<SearchProps> = props => (
  <Suspense fallback="Loading...">
    <SearchFeature {...props} />
  </Suspense>
);

export { Search };
