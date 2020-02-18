import React, {Component, FormEvent, ChangeEvent} from 'react';
import {SearchSource} from '@app/state/search/types';
import { DeezerSearchForm } from './components/deezer-search-form';
import { DeezerSearchOptions } from '@app/state/deezer/types';

export interface SearchProps {
}

export type DeezerSearchParams = DeezerSearchOptions & {
  source: 'deezer';
};

export type SpotifySearchParams = {source: 'spotify'};

export type SearchState = DeezerSearchParams | SpotifySearchParams;

const sources: Array<{
  value: SearchSource;
  label: string;
}> = [
  {value: 'deezer', label: 'Deezer'},
  {value: 'spotify', label: 'Spotify'},
];

class SearchComponent extends Component<SearchProps, SearchState> {
  state: SearchState = {
    source: 'deezer' as 'deezer',
    namespace: 'track',
    query: '',
  }

  onSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  onSourceChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;

    switch (value) {
      case 'deezer':
        this.setState({
          source: 'deezer',
          namespace: 'track',
          query: '',
        });
        break;
      case 'spotify':
        this.setState({
          source: 'spotify',
        });
        break;
      default:
        break;
    }
  }

  onParamsChange = (params: Omit<SearchState, 'source'>) => {
    this.setState(params);
  }

  render() {
    const {
      source,
      ...searchParams
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {sources.map(({value, label}) => (
          <label key={value}>
            <input 
              value={value} 
              name='source' 
              onChange={this.onSourceChange} 
              checked={source === value}
              type='radio'
            /> {label}
          </label>
        ))}
        {source === 'deezer' && (
          <DeezerSearchForm 
            searchParams={searchParams as DeezerSearchOptions}
            onChange={this.onParamsChange}
          />
        )}
      </form>
    );
  }
}

export {SearchComponent};