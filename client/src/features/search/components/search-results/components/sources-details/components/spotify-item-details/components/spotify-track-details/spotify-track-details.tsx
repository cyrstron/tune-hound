import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { SpotifyTrackSourceItemFull } from '@app/features/search/state/types';

import styles from './spotify-track-details.scss';

const cx = classNames.bind(styles);

export interface SpotifyTrackDetailsProps {
  id: string;
  track: SpotifyTrackSourceItemFull;
  className?: string;
}

const SpotifyTrackDetailsComponent: FC<SpotifyTrackDetailsProps> = ({
  track: { popularity, explicit },
  className,
}) => {
  return (
    <div className={cx('track-details', className)}>
      <div>Popularity: {popularity}</div>
      {explicit && <div>Explicit</div>}
    </div>
  );
};

export { SpotifyTrackDetailsComponent };
