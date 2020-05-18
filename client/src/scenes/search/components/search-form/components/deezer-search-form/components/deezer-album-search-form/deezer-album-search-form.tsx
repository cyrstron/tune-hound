import React, {Component, ChangeEvent, MouseEvent} from 'react';
import {
  DeezerSearchOptions,
  DeezerAdvancedAlbumSearchOptions,
  DeezerAdvancedAlbumQueryParams,
} from '@app/state/deezer/types';

export interface DeezerAlbumSearchFormProps {
  onChange: (params: DeezerSearchOptions) => void;
  searchParams: DeezerAdvancedAlbumSearchOptions;
  isAdvanced: boolean;
  toggleAdvance: () => void;
}

class DeezerAlbumSearchFormComponent extends Component<DeezerAlbumSearchFormProps> {
  onToggleAdvance = (e: MouseEvent) => {
    e.preventDefault();

    this.props.toggleAdvance();
  }

  onQueryChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    const {searchParams, onChange} = this.props;

    onChange({
      ...searchParams,
      query: {
        ...searchParams.query,
        album: value,
      },
    });
  }

  onAdvancedChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value: inputValue} = target;
    const {
      searchParams: {query, ...searchParams},
      onChange,
    } = this.props;
    const value = inputValue ? inputValue : undefined;

    let params: Partial<DeezerAdvancedAlbumQueryParams>;

    switch (name) {
    case 'artist':
      params = {artist: value};
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
      ...searchParams,
      query: {
        ...query,
        ...params,
      },
    });
  }

  render() {
    const {
      searchParams: {
        query: {album, artist, label, durMin, durMax, bpmMin, bpmMax},
      },
      isAdvanced,
    } = this.props;

    return (
      <>
        <input type="text" onChange={this.onQueryChange} value={album}/>
        <button type='submit'>Search</button>
        <button onClick={this.onToggleAdvance}>
          Advanced {isAdvanced ? '⇑' : '⇓'}
        </button>
        {isAdvanced && (
          <div>
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
          </div>
        )}
      </>
    );
  }
}

export {DeezerAlbumSearchFormComponent};
