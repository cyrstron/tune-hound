import React, {FC, Fragment, useCallback} from 'react';
import classNames from 'classnames/bind';
import { SearchedAlbum } from '@app/state/search/types';
import {SourceLink} from '@app/components/source-link';
import { SourceDetails } from '../sources-details';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/state';
import { selectIsAlbumActive, selectIsPlaying, selectIsPlayerPending } from '@app/state/player/selectors';
import { pause, play } from '@app/state/player/actions';
import { CoverPlayBtn } from '@app/components/cover-play-btn';

import styles from './searched-album.scss';
import { playSearchResult } from '@app/state/search';
import { selectOneOfExtensionsPending } from '@app/state/search/selectors';

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
    isCrossExtendable,
  } = album;

  const dispatch = useDispatch();

  const isAlbumActive = useSelector<AppState, boolean>((state) => selectIsAlbumActive(state, id));
  const isPlaying = useSelector(selectIsPlaying);
  const isPending = useSelector(selectIsPlayerPending);

  const isExtending = useSelector<AppState, boolean>((state) => selectOneOfExtensionsPending(state, id));

  const onPlay = useCallback(() => {
    const action = playSearchResult(id);

    dispatch(action);
  }, [id, dispatch]);

  const onPause = useCallback(() => {
    const action = pause();

    dispatch(action);
  }, [dispatch]);

  return (
    <article className={cx('album', className)}>
      <div className={cx('content')}>
        <CoverPlayBtn 
          src={coverUrl}
          title={`"${album.title}" by ${artists.join(', ')}`}
          className={cx('cover')}
          onPlay={onPlay}
          onPause={onPause}
          isPaused={isAlbumActive && !isPlaying}
          isPlaying={isAlbumActive && isPlaying}
          isPending={isAlbumActive && (isPending || isExtending)}
        />
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
          <SourceDetails
            id={id} 
            isCrossExtendable={isCrossExtendable} 
            spotify={spotify} 
            deezer={deezer} 
            className={cx('details')} 
          />
        </div>
      </div>
    </article>
  );
}

export {SearchedAlbumComponent};
