import React, {FC, useCallback, ChangeEvent} from 'react';
import classNames from 'classnames/bind';
import styles from './player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMuted, selectVolume, selectIsPlaying, selectCurrentTrack, selectPosition } from '@app/state/player/selectors';
import { setIsMuted, setVolume, play, pause, seek } from '@app/state/player/actions';
import { SeekBar } from './components/seek-bar/seek-bar';

const cx = classNames.bind(styles);

export interface PlayerProps {
  className?: string;
}

const Player: FC<PlayerProps> = ({className}) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const currentTrack = useSelector(selectCurrentTrack);
  const position = useSelector(selectPosition);
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

  const onSeek = useCallback((position: number) => {
    const action = seek(position);

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
      {currentTrack && (
        <div>
          <b>{currentTrack.name}</b> by <b>{currentTrack.artists.join(', ')}</b>
        </div>
      )}
      {!isPlaying && (
        <button onClick={onPlay} disabled={!currentTrack}>Play</button>
      )}
      {isPlaying && (
        <button onClick={onPause}>Pause</button>
      )}
      <button onClick={onMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
      <SeekBar onSeek={onSeek} position={position} duration={currentTrack?.duration} className={cx('seek-bar')}/>
      <input type='range' onChange={onVolumeChange} value={volume} min='0' max='100' step='1'/>
    </div>
  );
};

export {Player};
