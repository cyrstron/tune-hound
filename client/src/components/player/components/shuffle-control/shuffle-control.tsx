import React, {FC, useCallback} from 'react';
import classNames from 'classnames/bind';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsShuffled} from '@app/state/player/selectors';
import {setIsShuffled} from '@app/state/player/actions';

import styles from './shuffle-control.scss';

const cx = classNames.bind(styles);

export interface ShuffleControlProps {
  className?: string;
}

const ShuffleControl: FC<ShuffleControlProps> = ({className}) => {
  const dispatch = useDispatch();

  const isShuffled = useSelector(selectIsShuffled);

  const onShuffle = useCallback(() => {
    const action = setIsShuffled(!isShuffled);

    dispatch(action);
  }, [dispatch, isShuffled]);

  return (
    <div className={cx('play-prev-control', className)}>
      <button onClick={onShuffle}>
        {isShuffled ? 'Shuffled' : 'Not Shuffled'}
      </button>
    </div>
  );
};

export {ShuffleControl};
