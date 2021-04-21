import React, { FC, useCallback } from 'react';
import classNames from 'classnames/bind';
import { SearchedArtist } from '@app/features/search/state/types';
import { SourceLink } from '@app/components/source-link';
import { SourceDetails } from '../sources-details';

import styles from './searched-artist.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  createIsPlaylistActiveSelector,
  selectIsPlaying,
  selectIsPlayerPending,
} from '@app/state/player/selectors';
import { pause } from '@app/state/player/actions';
import { CoverPlayBtn } from '@app/components/cover-play-btn';
import { useSelectorCreator } from '@app/hooks/use-seletor-creator';
import { playSearchResult } from '@app/features/search/state';
import { useParamsSelector } from '@app/hooks';
import { selectSomeExtensionPendingById } from '@app/features/search/state/selectors';

const cx = classNames.bind(styles);

export interface SearchedArtistProps {
  artist: SearchedArtist;
  className?: string;
}

const SearchedArtistComponent: FC<SearchedArtistProps> = ({ artist, className }) => {
  const {
    id,
    coverUrl,
    sources: { deezer, spotify },
    name,
    isCrossExtendable,
  } = artist;

  const dispatch = useDispatch();

  const isPlaylistActive = useSelectorCreator(createIsPlaylistActiveSelector, id);
  const isPlaying = useSelector(selectIsPlaying);
  const isPending = useSelector(selectIsPlayerPending);

  const isExtending = useParamsSelector(selectSomeExtensionPendingById, id);

  const onPlay = useCallback(() => {
    const action = playSearchResult(id);

    dispatch(action);
  }, [id, dispatch]);

  const onPause = useCallback(() => {
    const action = pause();

    dispatch(action);
  }, [dispatch]);

  return (
    <article className={cx('artist', className)}>
      <div className={cx('content')}>
        <CoverPlayBtn
          src={coverUrl}
          title={name}
          className={cx('cover')}
          onPlay={onPlay}
          onPause={onPause}
          isPaused={isPlaylistActive && !isPlaying}
          isPlaying={isPlaylistActive && isPlaying}
          isPending={isPlaylistActive && (isPending || isExtending)}
        />
        <div className={cx('info-wrapper')}>
          <h1 className={cx('artist-title')}>
            <SourceLink
              externalUrls={{
                spotifyUrl: spotify?.['external_urls'].spotify,
                deezerUrl: deezer?.link,
              }}
            >
              {name}
            </SourceLink>
          </h1>
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
};

export { SearchedArtistComponent };
