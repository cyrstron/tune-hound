import React, {Component} from 'react';
import {SpotifyAdvancedSearchQuery} from '@app/state/spotify/types';

export interface AdvancedQueryControl {
  query: SpotifyAdvancedSearchQuery | string;
}

export class AdvancedQueryControlComponent extends Component<AdvancedQueryControl> {
  render() {
    const {query} = this.props;

    return (
      <div>
        <div>
          {typeof query === 'string' && (
            <input value={query} />
          )}
          {typeof query === 'object' && query.and.map((item) => (
            <input value={item} />
          ))}
          <button>+</button>
        </div>
        {typeof query !== 'string' && (
          <>
          </>
        )}
      </div>
    )
  }
}