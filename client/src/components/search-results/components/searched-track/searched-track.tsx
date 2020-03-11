import React, {FC} from 'react';
import { SearchedTrack } from '@app/state/search/types';

export interface SearchedTrackProps {
  track: SearchedTrack;
}

const SearchedTrackComponent: FC<SearchedTrackProps> = ({track}) => {
  return (
    <li>
      <div>
        <strong>"{track.name}"</strong> by <strong>{track.artists.join(' & ')}</strong> from <strong>"{track.album}"</strong>
      </div>
    </li>
  );
}

export {SearchedTrackComponent};
