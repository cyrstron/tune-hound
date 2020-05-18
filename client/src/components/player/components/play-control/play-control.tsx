import React, {FC, useCallback} from 'react';
import classNames from 'classnames/bind';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsPlaying, selectCurrentTrack, selectIsPlayerPending} from '@app/state/player/selectors';
import {play, pause} from '@app/state/player/actions';

import styles from './play-control.scss';

const cx = classNames.bind(styles);

export interface PlayControlProps {
  className?: string;
}

const PlayControl: FC<PlayControlProps> = ({className}) => {
  const dispatch = useDispatch();

  const currentTrack = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectIsPlaying);
  const isPending = useSelector(selectIsPlayerPending);

  const onPlay = useCallback(() => {
    const action = play();

    dispatch(action);
  }, [dispatch]);

  const onPause = useCallback(() => {
    const action = pause();

    dispatch(action);
  }, [dispatch]);


  return (
    <div className={cx('play-control', className, {
      pending: isPending,
    })}
    >
      {!isPlaying && (
        <button
          onClick={onPlay}
          disabled={!currentTrack || isPending}
          className={cx('play-btn')}
        >
          Play
        </button>
      )}
      {isPlaying && (
        <button
          onClick={onPause}
          className={cx('pause-btn')}
        >
          Pause
        </button>
      )}
    </div>
  );
};

export {PlayControl};
