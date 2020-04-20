import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SearchedPlaylist } from '@app/state/search/types';
import { SpotifyPlaylistDetails } from './components/spotify-playlist-details';
import { DeezerPlaylistDetails } from './components/deezer-playlist-details';

import styles from './searched-playlist.scss';
import { SourceDetails } from '../sources-details';

const cx = classNames.bind(styles);

export interface SearchedPlaylistProps {
  playlist: SearchedPlaylist;
  className?: string;
}

const SearchedPlaylistComponent: FC<SearchedPlaylistProps> = ({playlist, className}) => {
  const {
    id,
    title,
    coverUrl,
    author: {name},
    sources: {deezer, spotify},
    isCrossExtendable,
    tracksTotal,
  } = playlist;

  return (
    <article className={cx('playlist', className)}>
      <div className={cx('content')}>
        <div className={cx('cover-wrapper')}>
          <img className={cx('cover')} src={coverUrl} />
        </div>
        <div className={cx('info-wrapper')}>
          <h1 className={cx('playlist-title')}>
            {title}
          </h1>
          <div>{tracksTotal} track by <b>{name}</b></div>
          <SourceDetails id={id} isCrossExtendable={isCrossExtendable} spotify={spotify} deezer={deezer} className={cx('details')} />
        </div>
      </div>
    </article>
  );
}

export {SearchedPlaylistComponent};
