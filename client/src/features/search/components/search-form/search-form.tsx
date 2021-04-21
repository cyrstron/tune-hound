import React, { Component, FormEvent, ChangeEvent } from 'react';
import { SearchSource, SearchOptions } from '@app/features/search/state/types';
import { DeezerSearchForm } from './components/deezer-search-form';
import { SpotifySearchForm } from './components/spotify-search-form';
import { DeezerSearchOptions } from '@app/state/deezer/types';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { PlaylistType } from '@app/state/player/types';

export interface SearchFormProps {
  executeSearch: (source: SearchSource, options: SearchOptions) => void;
  isSpotifyConnected: boolean;
  isDeezerConnected: boolean;
}

export type DeezerSearchParams = DeezerSearchOptions & {
  source: SearchSource.DEEZER;
};

export type SpotifySearchParams = SpotifySearchOptions & { source: SearchSource.SPOTIFY };

export type SearchState =
  | DeezerSearchParams
  | (SpotifySearchParams & {
      query: string;
    });

class SearchFormComponent extends Component<SearchFormProps, SearchState> {
  constructor(props: SearchFormProps) {
    super(props);

    const { isSpotifyConnected, isDeezerConnected } = props;

    if (isSpotifyConnected) {
      this.state = {
        source: SearchSource.SPOTIFY,
        type: PlaylistType.TRACK,
        query: '',
      };
    } else if (isDeezerConnected) {
      this.state = {
        source: SearchSource.DEEZER,
        namespace: 'track',
        query: { track: '' },
      };
    }
  }

  get sources() {
    const { isDeezerConnected, isSpotifyConnected } = this.props;

    return [
      { value: SearchSource.DEEZER, label: 'Deezer', isDisabled: !isDeezerConnected },
      { value: SearchSource.SPOTIFY, label: 'Spotify', isDisabled: !isSpotifyConnected },
    ].filter(item => !!item) as Array<{
      value: SearchSource;
      label: string;
      isDisabled: boolean;
    }>;
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { executeSearch } = this.props;
    const { source, ...options } = this.state;

    executeSearch(source, options as DeezerSearchOptions);
  };

  onSourceChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    switch (value) {
      case SearchSource.DEEZER:
        this.setState({
          source: SearchSource.DEEZER,
          namespace: PlaylistType.TRACK,
          query: { track: '' },
        });
        break;
      case SearchSource.SPOTIFY:
        this.setState({
          source: SearchSource.SPOTIFY,
          type: PlaylistType.TRACK,
          query: '',
        });
        break;
      default:
        break;
    }
  };

  onParamsChange = (params: SearchOptions) => {
    this.setState(params as Omit<SearchState, 'source'>);
  };

  render() {
    const { source, ...searchParams } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {this.sources.map(({ value, label, isDisabled }) => (
          <label key={value}>
            <input
              value={value}
              name="source"
              onChange={this.onSourceChange}
              checked={source === value}
              type="radio"
              disabled={isDisabled}
            />{' '}
            {label}
          </label>
        ))}
        {source === SearchSource.DEEZER && (
          <DeezerSearchForm
            searchParams={searchParams as DeezerSearchOptions}
            onChange={this.onParamsChange}
          />
        )}
        {source === SearchSource.SPOTIFY && (
          <SpotifySearchForm
            searchParams={searchParams as SpotifySearchOptions}
            onChange={this.onParamsChange}
          />
        )}
      </form>
    );
  }
}

export { SearchFormComponent };
