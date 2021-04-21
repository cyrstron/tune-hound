import React, { Component, ChangeEvent } from 'react';
import {
  DeezerSearchOptions,
  DeezerSearchNamespace,
  DeezerSearchOrder,
  DeezerNamespaceSearchOptions,
} from '@app/state/deezer/types';
import { DeezerTrackSearchForm } from './components/deezer-track-search-form';
import { DeezerAlbumSearchForm } from './components/deezer-album-search-form';
import { DeezerArtistSearchForm } from './components/deezer-artist-search-form';
import { DeezerBasicSearchForm } from './components/deezer-basic-search-form';

export interface DeezerSearchFormProps {
  onChange: (params: DeezerSearchOptions) => void;
  searchParams: DeezerSearchOptions;
}

export type DeezerSearchFormState = {
  isAdvancedOpen: boolean;
};

const namespaces: Array<{
  value: DeezerSearchNamespace;
  label: string;
}> = [
  { value: 'track', label: 'Track' },
  { value: 'album', label: 'Album' },
  { value: 'artist', label: 'Artist' },
  { value: 'playlist', label: 'Playlist' },
];

const sortings: Array<{
  value: DeezerSearchOrder;
  label: string;
}> = [
  { value: 'RANKING', label: 'By ranking' },
  { value: 'TRACK_ASC', label: 'By track ⇑' },
  { value: 'TRACK_DESC', label: 'By track ⇓' },
  { value: 'ARTIST_ASC', label: 'By artist ⇑' },
  { value: 'ARTIST_DESC', label: 'By artist ⇓' },
  { value: 'ALBUM_ASC', label: 'By album ⇑' },
  { value: 'ALBUM_DESC', label: 'By album ⇓' },
  { value: 'RATING_ASC', label: 'By rating ⇑' },
  { value: 'RATING_DESC', label: 'By rating ⇓' },
  { value: 'DURATION_ASC', label: 'By duration ⇑' },
  { value: 'DURATION_DESC', label: 'By duration ⇓' },
];

class DeezerSearchFormComponent extends Component<DeezerSearchFormProps, DeezerSearchFormState> {
  state: DeezerSearchFormState = {
    isAdvancedOpen: false,
  };

  toggleAdvance = () => {
    this.setState({
      isAdvancedOpen: !this.state.isAdvancedOpen,
    });
  };

  onNamespaceChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    const { searchParams, onChange } = this.props;

    this.setState({
      isAdvancedOpen: false,
    });

    if (value === 'track') {
      onChange({
        ...searchParams,
        namespace: value as 'track',
        query: { track: this.getQueryString() },
      });
    } else if (value === 'album') {
      onChange({
        ...searchParams,
        namespace: value as 'album',
        query: { album: this.getQueryString() },
      });
    } else if (value === 'artist') {
      onChange({
        ...searchParams,
        namespace: value as 'artist',
        query: { artist: this.getQueryString() },
      });
    } else {
      onChange({
        ...searchParams,
        namespace: value as DeezerSearchNamespace,
        query: this.getQueryString(),
      } as DeezerNamespaceSearchOptions);
    }
  };

  onChange = (params: DeezerSearchOptions) => {
    const { onChange, searchParams } = this.props;

    onChange({
      ...searchParams,
      ...params,
    });
  };

  onStrictChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;
    const { searchParams, onChange } = this.props;

    onChange({
      ...searchParams,
      strict: checked,
    });
  };

  onSortingChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    const { searchParams, onChange } = this.props;

    onChange({
      ...searchParams,
      order: value as DeezerSearchOrder,
    });
  };

  getQueryString(): string {
    const { searchParams } = this.props;

    if (searchParams.namespace === 'track') {
      const { track } = searchParams.query;

      return track ? `${track}` : '';
    } else if (searchParams.namespace === 'album') {
      const { album } = searchParams.query;

      return album ? `${album}` : '';
    } else if (searchParams.namespace === 'artist') {
      const { artist } = searchParams.query;

      return artist ? `${artist}` : '';
    } else {
      return searchParams.query;
    }
  }

  render() {
    const { searchParams } = this.props;
    const { isAdvancedOpen } = this.state;

    const { namespace, strict, order } = searchParams;

    return (
      <div>
        <select name="namespace" onChange={this.onNamespaceChange} value={namespace}>
          {namespaces.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {searchParams.namespace === 'track' && (
          <DeezerTrackSearchForm
            onChange={this.onChange}
            searchParams={searchParams}
            isAdvanced={isAdvancedOpen}
            toggleAdvance={this.toggleAdvance}
          />
        )}
        {searchParams.namespace === 'album' && (
          <DeezerAlbumSearchForm
            onChange={this.onChange}
            searchParams={searchParams}
            isAdvanced={isAdvancedOpen}
            toggleAdvance={this.toggleAdvance}
          />
        )}
        {searchParams.namespace === 'artist' && (
          <DeezerArtistSearchForm
            onChange={this.onChange}
            searchParams={searchParams}
            isAdvanced={isAdvancedOpen}
            toggleAdvance={this.toggleAdvance}
          />
        )}
        {!['artist', 'album', 'track'].includes(searchParams.namespace) && (
          <DeezerBasicSearchForm
            onChange={this.onChange}
            searchParams={searchParams as DeezerNamespaceSearchOptions}
            isAdvanced={isAdvancedOpen}
            toggleAdvance={this.toggleAdvance}
          />
        )}
        {isAdvancedOpen && (
          <div>
            <label>
              <input type="checkbox" onChange={this.onStrictChange} checked={strict} />
              Strict
            </label>
            <br />
            <select name="namespace" onChange={this.onSortingChange} value={order}>
              {sortings.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
}

export { DeezerSearchFormComponent };
