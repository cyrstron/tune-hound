import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerSourceItemFull } from '@app/state/search/types';
import { DeezerTrackDetails } from './components/deezer-track-details';
import { DeezerAlbumDetails } from './components/deezer-album-details';
import { DeezerPlaylistDetails } from './components/deezer-playlist-details';
import { DeezerArtistDetails } from './components/deezer-artist-details';

const cx = classNames.bind({});

export interface DeezerItemDetailsProps {
  item: DeezerSourceItemFull;
  className?: string;
}

const DeezerItemDetailsComponent: FC<DeezerItemDetailsProps> = ({item, className}) => {
  switch(item.type) {
    case 'track':
      return (
        <DeezerTrackDetails track={item} className={cx(className)}/>
      );
    case 'album':
      return (
        <DeezerAlbumDetails album={item} className={cx(className)}/>
      );
    case 'playlist':
      return (
        <DeezerPlaylistDetails playlist={item} className={cx(className)}/>
      );
    case 'artist':
      return (
        <DeezerArtistDetails artist={item} className={cx(className)}/>
      );
    default:
      return null;
  }
}

export {DeezerItemDetailsComponent};
