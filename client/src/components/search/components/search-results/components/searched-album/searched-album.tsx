import React, {FC, Fragment} from 'react';
import classNames from 'classnames/bind';
import { SearchedAlbum } from '@app/state/search/types';
import {SourceLink} from '@app/components/source-link';
import { SourceDetails } from '../sources-details';

import styles from './searched-album.scss';

const cx = classNames.bind(styles);

export interface SearchedAlbumProps {
  album: SearchedAlbum;
  className?: string;
}

const SearchedAlbumComponent: FC<SearchedAlbumProps> = ({album, className}) => {
  const {
    id,
    coverUrl,
    sources: {deezer, spotify},
    title,
    artists,
  } = album;

  return (
    <article className={cx('album', className)}>
      <div className={cx('content')}>
        <div className={cx('cover-wrapper')}>
          <img className={cx('cover')} src={coverUrl} />
        </div>
        <div className={cx('info-wrapper')}>
          <h1 className={cx('album-title')}>
            <SourceLink
              externalUrls={{
                spotifyUrl: spotify?.external_urls.spotify,
                deezerUrl: deezer?.link,
              }}
            >
              {title}
            </SourceLink>
          </h1>
          <div>
            {artists.length === 1 ? 'Artist' : 'Artists'}:
            {' '}
            {artists.map((artist, index) => (
              <Fragment key={artist}>
                <SourceLink
                  className={cx('artist-link')}
                  externalUrls={{
                    spotifyUrl: spotify?.artists.find(({name}) => name === artist)?.external_urls.spotify,
                    deezerUrl: deezer?.artist.link,
                  }}
                >
                  {artist}
                </SourceLink>
                {index !== artists.length - 1 && ', '}
              </Fragment>
            ))}
          </div>
          <SourceDetails id={id} spotify={spotify} deezer={deezer} className={cx('details')} />
        </div>
      </div>
    </article>
  );
}

export {SearchedAlbumComponent};
