import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { SearchResult } from '@app/features/search/state/types';
import { SearchedTrack } from '../searched-track';
import { SearchedAlbum } from '../searched-album';
import { SearchedArtist } from '../searched-artist';
import { SearchedPlaylist } from '../searched-playlist';

import styles from './searched-item.scss';

const cx = classNames.bind(styles);

export interface SearchedTrackProps {
  item: SearchResult;
}

const SearchedItemComponent: FC<SearchedTrackProps> = ({ item }) => {
  return (
    <li className={cx('item-container')}>
      {item.type === 'track' && <SearchedTrack track={item} className={cx('item')} />}
      {item.type === 'album' && <SearchedAlbum album={item} className={cx('item')} />}
      {item.type === 'artist' && <SearchedArtist artist={item} className={cx('item')} />}
      {item.type === 'playlist' && <SearchedPlaylist playlist={item} className={cx('item')} />}
    </li>
  );
};

export { SearchedItemComponent };
