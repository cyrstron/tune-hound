import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {SpotifySourceItemFull} from '@app/state/search/types';
import {SpotifyTrackDetails} from './components/spotify-track-details';
import {SpotifyAlbumDetails} from './components/spotify-album-details';
import {SpotifyPlaylistDetails} from './components/spotify-playlist-details';
import {SpotifyArtistDetails} from './components/spotify-artist-details';

const cx = classNames.bind({});

export interface SpotifyItemDetailsProps {
  id: string;
  item: SpotifySourceItemFull;
  className?: string;
}

const SpotifyItemDetailsComponent: FC<SpotifyItemDetailsProps> = ({id, item, className}) => {
  switch (item.type) {
  case 'track':
    return (
      <SpotifyTrackDetails id={id} track={item} className={cx(className)} />
    );
  case 'album':
    return (
      <SpotifyAlbumDetails id={id} album={item} className={cx(className)} />
    );
  case 'playlist':
    return (
      <SpotifyPlaylistDetails id={id} playlist={item} className={cx(className)} />
    );
  case 'artist':
    return (
      <SpotifyArtistDetails id={id} artist={item} className={cx(className)} />
    );
  default:
    return null;
  }
};

export {SpotifyItemDetailsComponent};
