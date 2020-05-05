import React, {FC, useCallback, ChangeEvent} from 'react';
import classNames from 'classnames/bind';

import styles from './seek-bar.scss';
import { formatSeconds } from '@app/services/helpers';

const cx = classNames.bind(styles);

export interface SeekBarProps {
  position?: number;
  duration?: number;
  onSeek: (position: number) => void;
  className?: string;
}

const SeekBar: FC<SeekBarProps> = ({
  position = 0,
  duration = 0,
  onSeek,
  className,
}) => {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const position = +e.target.value;

    onSeek(position);
  }, [onSeek]);

  return (
    <div className={cx('seek-bar', className)}>
      <span className={cx('position')}>{formatSeconds(position * duration / 100)}</span>
      <input 
        className={cx('seek-control')}
        type='range' 
        onChange={onChange} 
        value={position.toFixed(1)} 
        min='0' 
        max='100' 
        step='0.1' 
        disabled={!duration}
      />
      <span className={cx('duration')}>{formatSeconds(duration)}</span>
    </div>
  );
};

export {SeekBar};