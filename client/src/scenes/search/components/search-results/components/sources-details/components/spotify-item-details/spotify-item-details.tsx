import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifySourceItemFull } from '@app/state/search/types';
import { SpotifyTrackDetails } from './components/spotify-track-details';
import { SpotifyAlbumDetails } from './components/spotify-album-details';
import { SpotifyPlaylistDetails } from './components/spotify-playlist-details';
import { SpotifyArtistDetails } from './components/spotify-artist-details';

const cx = classNames.bind({});

export interface SpotifyItemDetailsProps {
  item: SpotifySourceItemFull;
  className?: string;
}

const SpotifyItemDetailsComponent: FC<SpotifyItemDetailsProps> = ({item, className}) => {
  switch(item.type) {
    case 'track':
      return (
        <SpotifyTrackDetails track={item} className={cx(className)}/>
      );
    case 'album':
      return (
        <SpotifyAlbumDetails album={item} className={cx(className)}/>
      );
    case 'playlist':
      return (
        <SpotifyPlaylistDetails playlist={item} className={cx(className)}/>
      );
    case 'artist':
      return (
        <SpotifyArtistDetails artist={item} className={cx(className)}/>
      );
    default:
      return null;
  }
}

export {SpotifyItemDetailsComponent};
