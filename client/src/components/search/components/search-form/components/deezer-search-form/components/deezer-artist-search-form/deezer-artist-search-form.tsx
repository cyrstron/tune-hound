import React, {Component, ChangeEvent, MouseEvent} from 'react';
import { 
  DeezerSearchOptions,
  DeezerAdvancedArtistSearchOptions,
} from '@app/state/deezer/types';

export interface DeezerArtistSearchFormProps {
  onChange: (params: DeezerSearchOptions) => void;
  searchParams: DeezerAdvancedArtistSearchOptions;
  isAdvanced: boolean;
  toggleAdvance: () => void;
}

class DeezerArtistSearchFormComponent extends Component<DeezerArtistSearchFormProps> {
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
        artist: value,
      },
    });
  }

  render() {
    const {
      searchParams: {
        query: {artist},
      },
      isAdvanced,
    } = this.props;

    return (
      <>
        <input type="text" onChange={this.onQueryChange} value={artist}/>
        <button type='submit'>Search</button>
        <button onClick={this.onToggleAdvance}>
          Advanced {isAdvanced ? '⇑' : '⇓'}
        </button>
      </>
    )
  }
}

export {DeezerArtistSearchFormComponent};
