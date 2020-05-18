import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './track-item.scss';

const cx = classNames.bind(styles);

export interface TrackItemProps {
  title: string;
  artists: string[];
  id: string | number;
  className?: string;
}

const TrackItemComponent: FC<TrackItemProps> = ({
  title,
  artists,
  className,
}) => {
  return (
    <div className={cx('track', className)}>
      <div><b>{title}</b> by <b>{artists.join(', ')}</b></div>
    </div>
  );
};

export {TrackItemComponent};
