import React, {Component, FormEvent, ChangeEvent} from 'react';
import {SearchSource, SearchOptions} from '@app/state/search/types';
import {DeezerSearchForm} from './components/deezer-search-form';
import {SpotifySearchForm} from './components/spotify-search-form';
import {DeezerSearchOptions} from '@app/state/deezer/types';
import {SpotifySearchOptions} from '@app/state/spotify/types';

export interface SearchFormProps {
  executeSearch: (
    source: SearchSource,
    options: SearchOptions,
  ) => void;
  isSpotifyConnected: boolean;
  isDeezerConnected: boolean;
}

export type DeezerSearchParams = DeezerSearchOptions & {
  source: 'deezer';
};

export type SpotifySearchParams = SpotifySearchOptions & {source: 'spotify'};

export type SearchState = DeezerSearchParams | SpotifySearchParams & {
  query: string;
};

class SearchFormComponent extends Component<SearchFormProps, SearchState> {
  constructor(props: SearchFormProps) {
    super(props);

    const {
      isSpotifyConnected,
      isDeezerConnected,
    } = props;

    if (isSpotifyConnected) {
      this.state = {
        source: 'spotify' as 'spotify',
        type: 'track',
        query: '',
      };
    } else if (isDeezerConnected) {
      this.state = {
        source: 'deezer' as 'deezer',
        namespace: 'track',
        query: {track: ''},
      };
    }
  }

  get sources() {
    const {isDeezerConnected, isSpotifyConnected} = this.props;

    return [
      {value: 'deezer', label: 'Deezer', isDisabled: !isDeezerConnected},
      {value: 'spotify', label: 'Spotify', isDisabled: !isSpotifyConnected},
    ].filter((item) => !!item) as Array<{
      value: SearchSource;
      label: string;
      isDisabled: boolean;
    }>;
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const {executeSearch} = this.props;
    const {source, ...options} = this.state;

    executeSearch(source, options as DeezerSearchOptions);
  }

  onSourceChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;

    switch (value) {
    case 'deezer':
      this.setState({
        source: 'deezer',
        namespace: 'track',
        query: {track: ''},
      });
      break;
    case 'spotify':
      this.setState({
        source: 'spotify',
        type: 'track',
        query: '',
      });
      break;
    default:
      break;
    }
  }

  onParamsChange = (params: SearchOptions) => {
    this.setState(params as Omit<SearchState, 'source'>);
  }

  render() {
    const {
      source,
      ...searchParams
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {this.sources.map(({value, label, isDisabled}) => (
          <label key={value}>
            <input
              value={value}
              name='source'
              onChange={this.onSourceChange}
              checked={source === value}
              type='radio'
              disabled={isDisabled}
            /> {label}
          </label>
        ))}
        {source === 'deezer' && (
          <DeezerSearchForm
            searchParams={searchParams as DeezerSearchOptions}
            onChange={this.onParamsChange}
          />
        )}
        {source === 'spotify' && (
          <SpotifySearchForm
            searchParams={searchParams as SpotifySearchOptions}
            onChange={this.onParamsChange}
          />
        )}
      </form>
    );
  }
}

export {SearchFormComponent};
