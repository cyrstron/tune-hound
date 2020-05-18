import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {DeezerTrack} from '@app/state/deezer/types';

import styles from './deezer-short-track.scss';

const cx = classNames.bind(styles);

export interface DeezerShortTrackProps {
  track: Omit<DeezerTrack, 'album'>;
  className?: string;
}

const DeezerShortTrackComponent: FC<DeezerShortTrackProps> = ({
  track: {title, artist},
  className,
}) => {
  return (
    <div className={cx('track', className)}>
      <div><b>{title}</b> by <b>{artist.name}</b></div>
    </div>
  );
};

export {DeezerShortTrackComponent};
