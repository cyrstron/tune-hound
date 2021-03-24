import React, { FC, useCallback } from 'react';
import classNames from 'classnames/bind';
import { SearchedArtist } from '@app/state/search/types';
import { SourceLink } from '@app/components/source-link';
import { SourceDetails } from '../sources-details';

import styles from './searched-artist.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/state';
import {
  createIsPlaylistActiveSelector,
  selectIsPlaying,
  selectIsPlayerPending,
} from '@app/state/player/selectors';
import { selectOneOfExtensionsPending } from '@app/state/search/selectors';
import { playSearchResult } from '@app/state/search';
import { pause } from '@app/state/player/actions';
import { CoverPlayBtn } from '@app/components/cover-play-btn';
import { useSelectorCreator } from '@app/hooks/use-params-selector';

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

  const isExtending = useSelector<AppState, boolean>(state =>
    selectOneOfExtensionsPending(state, id),
  );

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
