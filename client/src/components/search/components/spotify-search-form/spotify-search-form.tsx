import React, {Component, ChangeEvent, MouseEvent} from 'react';
import {
  SpotifySearchItemType, 
  SpotifySearchOptions,
  SpotifyBasicAdvancedSearchQuery,
} from '@app/state/spotify/types';
import {AdvancedQueryControl} from './components/advanced-query-control';

export interface DeezerSearchFormProps {
  onChange: (params: SpotifySearchOptions) => void;
  searchParams: SpotifySearchOptions;
}

export type DeezerSearchFormState = {
  isAdvancedOpen: boolean;
};

const namespaces: Array<{
  value: SpotifySearchItemType,
  label: string,
}> = [
  {value: 'track', label: 'Track'},
  {value: 'album', label: 'Album'},
  {value: 'artist', label: 'Artist'},
  {value: 'playlist', label: 'Playlist'},
];


class SpotifySearchFormComponent extends Component<DeezerSearchFormProps, DeezerSearchFormState> {
  state: DeezerSearchFormState = {
    isAdvancedOpen: false,
  }

  onToggleAdvance = (e: MouseEvent) => {
    e.preventDefault();

    this.setState({
      isAdvancedOpen: !this.state.isAdvancedOpen,
    });
  }

  onNamespaceChange = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const {value} = target;
    const {searchParams, onChange} = this.props;

    onChange({
      ...searchParams,
      type: value as SpotifySearchItemType,
    });
  }

  onQueryChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    const {searchParams, onChange} = this.props;

    onChange({
      ...searchParams,
      query: value,
    });
  }

  onAdvancedQueryChange = (query: SpotifyBasicAdvancedSearchQuery) => {
    const {searchParams, onChange} = this.props;

    onChange({
      ...searchParams,
      query,
    });
  }

  render() {
    const {
      type,
      query,
    } = this.props.searchParams;
    const {isAdvancedOpen} = this.state;

    return (
      <div>
        <select name='type' onChange={this.onNamespaceChange} value={type}>
          {namespaces.map(({label, value}) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {!isAdvancedOpen && (
          <>
            <input type="text" onChange={this.onQueryChange} value={query as string}/>
            <button type='submit'>Search</button>
          </>
        )}
        <button onClick={this.onToggleAdvance}>
          Advanced {isAdvancedOpen ? '⇑' : '⇓'}
        </button>
        {isAdvancedOpen && (
          <AdvancedQueryControl 
            query={typeof query !== 'string' ? query : undefined} 
            onChange={this.onAdvancedQueryChange}
            type={type}
          />
        )}
      </div>
    )
  }
}

export {SpotifySearchFormComponent};
