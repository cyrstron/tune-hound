import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SearchedArtist } from '@app/state/search/types';
import {SourceLink} from '@app/components/source-link';
import { SourceDetails } from '../sources-details';

import styles from './searched-artist.scss';

const cx = classNames.bind(styles);

export interface SearchedArtistProps {
  artist: SearchedArtist;
  className?: string;
}

const SearchedArtistComponent: FC<SearchedArtistProps> = ({artist, className}) => {
  const {
    id,
    coverUrl,
    sources: {deezer, spotify},
    name,
    type,
  } = artist;

  return (
    <article className={cx('artist', className)}>
      <div className={cx('content')}>
        <div className={cx('cover-wrapper')}>
          <img className={cx('cover')} src={coverUrl} />
        </div>
        <div className={cx('info-wrapper')}>
          <h1 className={cx('artist-title')}>
            <SourceLink
              externalUrls={{
                spotifyUrl: spotify?.external_urls.spotify,
                deezerUrl: deezer?.link,
              }}
            >
              {name}
            </SourceLink>
          </h1>
          <SourceDetails id={id} type={type} spotify={spotify} deezer={deezer} className={cx('details')} />
        </div>
      </div>
    </article>
  );
}

export {SearchedArtistComponent};
