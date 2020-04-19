import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { DeezerTrackSourceItemFull } from '@app/state/search/types';

import styles from './deezer-track-details.scss';

const cx = classNames.bind(styles);

export interface DeezerTrackDetailsProps {
  track: DeezerTrackSourceItemFull;
  className?: string;
}

const DeezerTrackDetailsComponent: FC<DeezerTrackDetailsProps> = ({
  track: {rank, release_date, explicit_lyrics}, 
  className
}) => {
  return (
    <div className={cx('track-details', className)}>
      <div>Rank: {rank}</div>
      <div>Release date: {release_date}</div>
      {explicit_lyrics && (
        <div>Explicit</div>
      )}
    </div>
  )
}

export {DeezerTrackDetailsComponent}
