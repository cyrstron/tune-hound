import React, {FC, useCallback, ChangeEvent} from 'react';
import classNames from 'classnames/bind';
import styles from './player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMuted, selectVolume, selectIsPlaying, selectCurrentTrack } from '@app/state/player/selectors';
import { setIsMuted, setVolume, play, pause } from '@app/state/player/actions';

const cx = classNames.bind(styles);

export interface PlayerProps {
  className?: string;
}

const Player: FC<PlayerProps> = ({className}) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const currentTrack = useSelector(selectCurrentTrack);
  const isMuted = useSelector(selectIsMuted);
  const volume = useSelector(selectVolume);

  const onMute = useCallback(() => {
    const action = setIsMuted(!isMuted);

    dispatch(action);
  }, [dispatch, isMuted]);

  const onVolumeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const volume = +e.target.value;

    const action = setVolume(volume);

    dispatch(action);
  }, [dispatch]);

  const onPlay = useCallback(() => {
    const action = play();

    dispatch(action);
  }, [dispatch]);

  const onPause = useCallback(() => {
    const action = pause();

    dispatch(action);
  }, [dispatch]);

  return (
    <div className={cx('player', className)}>
      {!isPlaying && (
        <button onClick={onPlay} disabled={!!currentTrack}>Play</button>
      )}
      {isPlaying && (
        <button onClick={onPause}>Pause</button>
      )}
      <button onClick={onMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
      <input type='range' onChange={onVolumeChange} value={volume} min='0' max='100' step='1'/>
    </div>
  );
};

export {Player};
