import React, {FC, useCallback} from 'react';
import classNames from 'classnames/bind';
import { TrackItem, TrackItemProps } from '../../../track-item';

import styles from './ordered-track.scss';

const cx = classNames.bind(styles);

export interface OrderedTrackProps extends TrackItemProps {
  id: string | number;
  index: number;
  className?: string;
  isPlaying?: boolean;
  isPaused?: boolean;
  isPending?: boolean;
  onPlay: (index: number) => void;
  onPause: () => void;
}

const OrderedTrackComponent: FC<OrderedTrackProps> = ({
  index,
  className,
  isPaused,
  isPending,
  isPlaying,
  onPause,
  onPlay,
  ...props
}) => {
  const onClick = useCallback(() => {
    if (isPending) return;

    if (isPlaying) {
      onPause();
    } else {
      onPlay(index);
    }
  }, [index, onPause, onPlay, isPlaying, isPending, isPaused]);

  return (
    <li className={cx('track-item', className)}>
      <button
        onClick={onClick}
        className={cx('index-play-btn', {
          'playing': isPlaying,
          'paused': isPaused,
          'pending': isPending,
        })}
      >
        {index + 1}
      </button>
      <TrackItem className={cx('track-content')} {...props}/>
    </li>
  );
}

export {OrderedTrackComponent}
