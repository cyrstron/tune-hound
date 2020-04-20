import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { TrackItem, TrackItemProps } from '../../../track-item';

import styles from './ordered-track.scss';

const cx = classNames.bind(styles);

export interface OrderedTrackProps extends TrackItemProps {
  id: string | number;
  index: number;
  className?: string;
}

const OrderedTrackComponent: FC<OrderedTrackProps> = ({
  className,
  index,
  ...props
}) => {
  return (
    <li className={cx('track-item', className)}>
      <div className={cx('index')}>{index + 1}</div>
      <TrackItem className={cx('track-content')} {...props}/>
    </li>
  );
}

export {OrderedTrackComponent}
