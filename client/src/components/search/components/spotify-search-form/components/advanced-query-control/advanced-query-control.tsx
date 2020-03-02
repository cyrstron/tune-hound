import React, {Component, ChangeEvent} from 'react';
import {
  SpotifyAdvancedSearchQuery, 
  SpotifySearchItemType,
  SpotifyAlbumAdvancedSearchQuery,
  SpotifyArtistAdvancedSearchQuery,
  SpotifyTrackAdvancedSearchQuery
} from '@app/state/spotify/types';
import {IndexatedInput} from '../indexated-input';
import { IndexatedInputs } from '../indexated-inputs';

export interface AdvancedQueryControl {
  query?: SpotifyAdvancedSearchQuery;
  type: SpotifySearchItemType;
  onChange: (query: SpotifyAdvancedSearchQuery) => void
}

export class AdvancedQueryControlComponent extends Component<AdvancedQueryControl> {
  onAndChange = (values: string[]) => {
    const {onChange, query} = this.props;

    onChange({
      ...query || {},
      and: values,
    });
  }

  onOrChange = (values: string[]) => {
    const {onChange, query} = this.props;

    if (!query) return;

    onChange({
      ...query,
      or: values,
    });
  }

  onNotChange = (values: string[]) => {
    const {onChange, query} = this.props;

    if (!query) return;

    onChange({
      ...query,
      not: values,
    });
  }

  onTrackChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const {onChange, query, type} = this.props;

    if (type === 'playlist' || type === 'track') return;
    
    onChange({
      ...query,
      track: value,
    } as SpotifyArtistAdvancedSearchQuery | SpotifyAlbumAdvancedSearchQuery);
  }

  onAlbumChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const {onChange, query, type} = this.props;

    if (type === 'playlist' || type === 'album') return;
    
    onChange({
      ...query,
      album: value,
    } as SpotifyArtistAdvancedSearchQuery | SpotifyTrackAdvancedSearchQuery);
  }

  onArtistChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const {onChange, query, type} = this.props;

    if (type === 'playlist' || type === 'artist') return;
    
    onChange({
      ...query,
      artist: value,
    } as SpotifyTrackAdvancedSearchQuery | SpotifyAlbumAdvancedSearchQuery);
  }

  onGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    const {onChange, query, type} = this.props;

    if (type === 'playlist') return;
    
    onChange({
      ...query,
      genre: value,
    } as (
      SpotifyTrackAdvancedSearchQuery | 
      SpotifyAlbumAdvancedSearchQuery | 
      SpotifyArtistAdvancedSearchQuery
    ));
  }

  onIsNewChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {checked} = e.target;
    const {onChange, query, type} = this.props;

    if (type !== 'album') return;
    
    onChange({
      ...query,
      isNew: checked,
    } as SpotifyAlbumAdvancedSearchQuery);
  }

  onIsHipsterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {checked} = e.target;
    const {onChange, query, type} = this.props;

    if (type !== 'album') return;
    
    onChange({
      ...query,
      isHipster: checked,
    } as SpotifyAlbumAdvancedSearchQuery);
  }

  render() {
    const {query, type} = this.props;

    const hasOtherFields = query && (query.and.length > 1 || query.and[0] !== '');

    return (
      <div>
        <IndexatedInputs 
          label='Search keys:'
          values={query && query.and} 
          onChange={this.onAndChange} 
        />
        {hasOtherFields && (
          <IndexatedInputs 
            label='Include:'
            values={query && query.or} 
            onChange={this.onOrChange} 
          />
        )}
        {hasOtherFields && (
          <IndexatedInputs 
            label='Exclude:'
            values={query && query.not} 
            onChange={this.onNotChange} 
          />
        )}
        {type !== 'track' && type !== 'playlist' && (
          <div>
            <label>
              Track:
              <input 
                value={query && 'track' in query ? query.track : ''}
                onChange={this.onTrackChange}
              />
            </label>
          </div>
        )}
        {type !== 'album' && type !== 'playlist' && (
          <div>
            <label>
              Album:
              <input 
                value={query && 'album' in query ? query.album : ''}
                onChange={this.onAlbumChange}
              />
            </label>
          </div>
        )}
        {type !== 'artist' && type !== 'playlist' && (
          <div>
            <label>
              Artist:
              <input 
                value={query && 'artist' in query ? query.artist : ''}
                onChange={this.onArtistChange}
              />
            </label>
          </div>
        )}
        {type !== 'playlist' && (
          <div>
            <label>
              Genre:
              <input 
                value={query && 'genre' in query ? query.genre : ''}
                onChange={this.onGenreChange}
              />
            </label>
          </div>
        )}
        {type === 'album' && (
          <div>
            <label>
              <input 
                checked={query && 'isNew' in query ? query.isNew : false}
                onChange={this.onIsNewChange}
                type='checkbox'
              />
              {' '}
              Only last releases
            </label>
          </div>
        )}
        {type === 'album' && (
          <div>
            <label>
              <input 
                checked={query && 'isHipster' in query ? query.isNew : false}
                onChange={this.onIsHipsterChange}
                type='checkbox'
              />
              {' '}
              Only unpopular
            </label>
          </div>
        )}
      </div>
    );
  }
}