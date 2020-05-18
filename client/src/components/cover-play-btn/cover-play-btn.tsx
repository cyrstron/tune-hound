import React, {FC} from 'react';
import classNames from 'classnames/bind';

import styles from './cover-play-btn.scss';

const cx = classNames.bind(styles);

export interface CoverPlayBtnProps {
  src: string;
  onPlay: () => void;
  onPause: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  className?: string;
  isPending?: boolean;
  title: string;
}

const CoverPlayBtn: FC<CoverPlayBtnProps> = ({
  isPlaying,
  onPause,
  onPlay,
  src,
  title,
  className,
  isPaused,
  isPending,
}) => {
  return (
    <div
      className={cx('cover-wrapper', className, {
        'playing': isPlaying,
        'paused': isPaused,
        'pending': isPending,
      })}
    >
      <button
        className={cx('btn')}
        onClick={isPlaying ? onPause : onPlay}
        disabled={isPending}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <img
        className={cx('cover')}
        src={src}
        alt={title}
      />
    </div>
  );
};

export {CoverPlayBtn};
