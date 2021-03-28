import React, { FC, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { selectRepeatMode } from '@app/state/player/selectors';
import { RepeatMode } from '@app/state/player/types';

import styles from './repeat-control.scss';
import { setRepeatMode } from '@app/state/player/actions';

const cx = classNames.bind(styles);

export interface RepeatControlProps {
  className?: string;
}

const repeatModeLabels = {
  [RepeatMode.NO_REPEAT]: 'No repeat',
  [RepeatMode.REPEAT_ONE]: 'Repeat One',
  [RepeatMode.REPEAT_ALL]: 'Repeat All',
};

const RepeatControl: FC<RepeatControlProps> = ({ className }) => {
  const dispatch = useDispatch();

  const repeatMode = useSelector(selectRepeatMode);

  const onRepeatMode = useCallback(() => {
    let newRepeatMode: RepeatMode;

    switch (repeatMode) {
      case RepeatMode.NO_REPEAT:
        newRepeatMode = RepeatMode.REPEAT_ALL;
        break;
      case RepeatMode.REPEAT_ALL:
        newRepeatMode = RepeatMode.REPEAT_ONE;
        break;
      case RepeatMode.REPEAT_ONE:
        newRepeatMode = RepeatMode.NO_REPEAT;
        break;
      default:
        newRepeatMode = RepeatMode.NO_REPEAT;
    }

    const action = setRepeatMode(newRepeatMode);

    dispatch(action);
  }, [dispatch, repeatMode]);

  return (
    <div className={cx('repeat-control', className)}>
      <button onClick={onRepeatMode} className={cx('repeat-btn')}>
        {repeatModeLabels[repeatMode]}
      </button>
    </div>
  );
};

export { RepeatControl };
