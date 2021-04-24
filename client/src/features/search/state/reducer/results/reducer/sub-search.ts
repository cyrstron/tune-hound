import { SearchOptions, SourceItemShort } from '../../../types';

export type SubSearchState = {
  searchOptions?: SearchOptions;
  limit: number;
  offset: number;
  totals: Array<number | undefined>;
  error?: Error;
  isPending: boolean;
  isFetchPending: boolean;
  results?: SourceItemShort[];
};
