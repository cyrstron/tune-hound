import React, {FC, Fragment, useCallback} from 'react';
import classNames from 'classnames/bind';
import { SearchedTrack } from '@app/state/search/types';
import {SourceLink} from '@app/components/source-link';

import styles from './searched-track.scss';
import { SourceDetails } from '../sources-details';
import { useDispatch } from 'react-redux';
import { PlayerTrack } from '@app/state/player/types';
import { playTrack } from '@app/state/player/actions';

const cx = classNames.bind(styles);

export interface SearchedTrackProps {
  track: SearchedTrack;
  className?: string;
}

const SearchedTrackComponent: FC<SearchedTrackProps> = ({track, className}) => {
  const {
    id,
    coverUrl,
    artists,
    album,
    sources: {spotify, deezer},
    isCrossExtendable,
  } = track;

  const dispatch = useDispatch();

  const onPlay = useCallback(() => {
    let playerTrack: PlayerTrack = {
      source: track.sources.spotify ? 'spotify' : 'deezer',
      name: track.name,
      artists: track.artists,
      albumTitle: track.album,
      duration: track.duration,
      trackSource: {id: track.sources.spotify ? track.sources.spotify.id : track.sources.deezer!.id},
    } as PlayerTrack;

    const action = playTrack(playerTrack);

    dispatch(action);
  }, [track, dispatch]);

  return (
    <article className={cx('track', className)}>
      <div className={cx('content')}>
        <div className={cx('cover-wrapper')}>
          <img className={cx('cover')} src={coverUrl} />
        </div>
        <div className={cx('info-wrapper')}>
          <h1 className={cx('track-title')}>
            <button onClick={onPlay}>Play</button>
            <SourceLink
              externalUrls={{
                spotifyUrl: spotify?.external_urls.spotify,
                deezerUrl: deezer?.link,
              }}
            >
              {track.name}
            </SourceLink>
          </h1>
          <div>
            Album:
            {' '}
            <SourceLink
              className={cx('album-link')}
              externalUrls={{
                spotifyUrl: spotify?.album.external_urls.spotify,
                deezerUrl: deezer ? `https://www.deezer.com/album/${deezer.album.id}` : undefined,
              }}
            >
              {album}
            </SourceLink>
          </div>
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
          <SourceDetails id={id} isCrossExtendable={isCrossExtendable} spotify={spotify} deezer={deezer} className={cx('details')} />
        </div>
      </div>
    </article>
  );
}

export {SearchedTrackComponent};
