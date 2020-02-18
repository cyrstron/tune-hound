import React, {Component, ChangeEvent, MouseEvent} from 'react';
import { DeezerSearchOptions, DeezerSearchNamespace, DeezerSearchOrder, DeezerAdvancedSearchOptions } from '@app/state/deezer/types';

export interface DeezerSearchFormProps {
  onChange: (params: DeezerSearchOptions) => void;
  searchParams: DeezerSearchOptions;
}

export type DeezerSearchFormState = {
  isAdvancedOpen: boolean;
};

const namespaces: Array<{
  value: DeezerSearchNamespace,
  label: string,
}> = [
  {value: 'track', label: 'Track'},
  {value: 'artist', label: 'Artist'},
  {value: 'history', label: 'History'},
  {value: 'playlist', label: 'Playlist'},
  {value: 'radio', label: 'Radio'},
  {value: 'user', label: 'User'},
];

const sortings: Array<{
  value: DeezerSearchOrder,
  label: string,
}> = [
  {value: 'RANKING', label: 'By ranking'},
  {value: 'TRACK_ASC', label: 'By track ⇑'},
  {value: 'TRACK_DESC', label: 'By track ⇓'},
  {value: 'ARTIST_ASC', label: 'By artist ⇑'},
  {value: 'ARTIST_DESC', label: 'By artist ⇓'},
  {value: 'ALBUM_ASC', label: 'By album ⇑'},
  {value: 'ALBUM_DESC', label: 'By album ⇓'},
  {value: 'RATING_ASC', label: 'By rating ⇑'},
  {value: 'RATING_DESC', label: 'By rating ⇓'},
  {value: 'DURATION_ASC', label: 'By duration ⇑'},
  {value: 'DURATION_DESC', label: 'By duration ⇓'},
];

class DeezerSearchFormComponent extends Component<DeezerSearchFormProps, DeezerSearchFormState> {
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
      namespace: value as DeezerSearchNamespace,
      query: searchParams.query,
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

  onStrictChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {checked} = target;
    const {searchParams, onChange} = this.props;

    onChange({
      ...searchParams,
      strict: checked,
    });
  }

  onSortingChange = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const {value} = target;
    const {searchParams, onChange} = this.props;

    onChange({
      ...searchParams,
      order: value as DeezerSearchOrder,
    });
  }

  onAdvancedChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value: inputValue} = target;
    const {
      searchParams: {namespace, query, strict, order, ...searchParams}, 
      onChange
    } = this.props;
    const value = inputValue ? inputValue : undefined;

    let params: Partial<DeezerAdvancedSearchOptions>;

    switch(name) {
      case 'artist':
        params = {artist: value};
        break;
      case 'album':
        params = {album: value};
        break;
      case 'label':
        params = {label: value};
        break;
      case 'dur-min':
        params = {durMin: value === undefined ? value : +value};
        break;
      case 'dur-max':
        params = {durMax: value === undefined ? value : +value};
        break;
      case 'bpm-min':
        params = {bpmMin: value === undefined ? value : +value};
        break;
      case 'bpm-max':
        params = {bpmMax: value === undefined ? value : +value};
        break;
      default:
        params = {};
        break;
    }

    onChange({
      ...this.props.searchParams,
      ...params,
    });
  }

  render() {
    const {
      namespace,
      query,
      strict,
      order,
      ...advancedParams
    } = this.props.searchParams ;
    const {
      artist,
      album,
      track,
      label,
      durMin,
      durMax,
      bpmMin,
      bpmMax,
    } = advancedParams as DeezerAdvancedSearchOptions;
    const {isAdvancedOpen} = this.state;

    return (
      <div>
        <select name='namespace' onChange={this.onNamespaceChange} value={namespace}>
          {namespaces.map(({label, value}) => (
            <option value={value}>{label}</option>
          ))}
        </select>
        <input type="text" onChange={this.onQueryChange} value={query}/>
        <button onClick={this.onToggleAdvance}>
          Advanced {isAdvancedOpen ? '⇑' : '⇓'}
        </button>
        {isAdvancedOpen && (
          <div>
            <label>
              <input type="checkbox" onChange={this.onStrictChange} checked={strict}/>
              Strict
            </label>
            {' '}
            <select name='namespace' onChange={this.onSortingChange} value={order}>
              {sortings.map(({label, value}) => (
                <option value={value}>{label}</option>
              ))}
            </select>
            {namespace === 'track' && (
              <>
                <label>
                  Artist:
                  <input 
                    type="text" 
                    onChange={this.onAdvancedChange} 
                    value={artist}
                    name='artist'
                  />
                </label>
                <br/>
                <label>
                  Album:
                  <input 
                    type="text" 
                    onChange={this.onAdvancedChange} 
                    value={album}
                    name='album'
                  />
                </label>
                <br/>
                <label>
                  Track:
                  <input 
                    type="text" 
                    onChange={this.onAdvancedChange} 
                    value={track}
                    name='track'
                  />
                </label>
                <br/>
                <label>
                  Label:
                  <input 
                    type="text" 
                    onChange={this.onAdvancedChange} 
                    value={label}
                    name='label'
                  />
                </label>
                <br/>
                Duration{' '}
                <label>
                  Min:
                  <input 
                    type="number" 
                    onChange={this.onAdvancedChange} 
                    value={durMin}
                    max={durMax}
                    name='dur-min'
                  />
                  Max:                  
                  <input 
                    type="number" 
                    onChange={this.onAdvancedChange} 
                    value={durMax}
                    min={durMin}
                    name='dur-max'
                  />
                </label>
                <br/>
                BPM{' '}
                <label>
                  Min:
                  <input 
                    type="number" 
                    onChange={this.onAdvancedChange} 
                    value={bpmMin}
                    max={bpmMax}
                    name='bpm-min'
                  />
                  Max:                  
                  <input 
                    type="number" 
                    onChange={this.onAdvancedChange} 
                    value={bpmMax}
                    min={bpmMin}
                    name='bpm-max'
                  />
                </label>
              </>
            )}
          </div>
        )}
      </div>
    )
  }
}

export {DeezerSearchFormComponent};
