import React, { FC, Fragment, useCallback } from 'react';
import classNames from 'classnames/bind';
import { SearchedTrack } from '@app/state/search/types';
import { SourceLink } from '@app/components/source-link';

import styles from './searched-track.scss';
import { SourceDetails } from '../sources-details';
import { useDispatch, useSelector } from 'react-redux';
import { playSearchResult } from '@app/state/search/actions';
import { pause } from '@app/state/player/actions';
import { CoverPlayBtn } from '@app/components/cover-play-btn';
import { AppState } from '@app/state';
import {
  createIsTrackActiveSelector,
  selectIsPlaying,
  selectIsPlayerPending,
} from '@app/state/player/selectors';
import { selectOneOfExtensionsPending } from '@app/state/search/selectors';
import { useSelectorCreator } from '@app/hooks/use-params-selector';

const cx = classNames.bind(styles);

export interface SearchedTrackProps {
  track: SearchedTrack;
  className?: string;
}

const SearchedTrackComponent: FC<SearchedTrackProps> = ({ track, className }) => {
  const {
    id,
    coverUrl,
    artists,
    album,
    sources: { spotify, deezer },
    isCrossExtendable,
  } = track;

  const dispatch = useDispatch();

  const isTrackActive = useSelectorCreator(createIsTrackActiveSelector, id);
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
    <article className={cx('track', className)}>
      <div className={cx('content')}>
        <CoverPlayBtn
          src={coverUrl}
          title={`"${track.name}" by ${artists.join(', ')}`}
          className={cx('cover')}
          onPlay={onPlay}
          onPause={onPause}
          isPaused={isTrackActive && !isPlaying}
          isPlaying={isTrackActive && isPlaying}
          isPending={isTrackActive && (isPending || isExtending)}
        />
        <div className={cx('info-wrapper')}>
          <h1 className={cx('track-title')}>
            <SourceLink
              externalUrls={{
                spotifyUrl: spotify?.['external_urls'].spotify,
                deezerUrl: deezer?.link,
              }}
            >
              {track.name}
            </SourceLink>
          </h1>
          <div>
            Album:{' '}
            <SourceLink
              className={cx('album-link')}
              externalUrls={{
                spotifyUrl: spotify?.album['external_urls'].spotify,
                deezerUrl: deezer ? `https://www.deezer.com/album/${deezer.album.id}` : undefined,
              }}
            >
              {album}
            </SourceLink>
          </div>
          <div>
            {artists.length === 1 ? 'Artist' : 'Artists'}:{' '}
            {artists.map((artist, index) => (
              <Fragment key={artist}>
                <SourceLink
                  className={cx('artist-link')}
                  externalUrls={{
                    spotifyUrl: spotify?.artists.find(({ name }) => name === artist)?.[
                      'external_urls'
                    ].spotify,
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
};

export { SearchedTrackComponent };
