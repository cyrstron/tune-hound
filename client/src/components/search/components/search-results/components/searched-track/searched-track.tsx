import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SearchedTrack } from '@app/state/search/types';

import styles from './searched-track.scss';

const cx = classNames.bind(styles);

export interface SearchedTrackProps {
  track: SearchedTrack;
  className?: string;
}

const SearchedTrackComponent: FC<SearchedTrackProps> = ({track, className}) => {
  return (
    <article className={cx('track', className)}>
      <div className={cx('content')}>
        <div className={cx('cover-wrapper')}>
          <img className={cx('cover')} src={track.coverUrl} />
        </div>
        <div className={cx('info-wrapper')}>
          <h1 className={cx('track-title')}>{track.name}</h1>
          <strong>{track.artists.join(' & ')}</strong> from <strong>"{track.album}"</strong>
        </div>
      </div>
    </article>
  );
}

export {SearchedTrackComponent};
