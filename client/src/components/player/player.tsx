import React, {FC, useCallback, ChangeEvent} from 'react';
import classNames from 'classnames/bind';
import styles from './player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMuted, selectVolume, selectIsPlaying, selectCurrentTrack, selectPosition, selectIsPlayerPending, selectIsShuffled, selectRepeatMode, selectHasNextTrack, selectHasPrevTrack } from '@app/state/player/selectors';
import { setIsMuted, setVolume, play, pause, seek, setIsShuffled, setRepeatMode, playNext, playPrev } from '@app/state/player/actions';
import { SeekBar } from './components/seek-bar/seek-bar';
import { noRepeatMode, repeatOneMode, repeatAllMode, RepeatMode } from '@app/state/player/types';

const cx = classNames.bind(styles);

export interface PlayerProps {
  className?: string;
}

const repeatModeLabels = {
  [noRepeatMode]: 'No repeat',
  [repeatOneMode]: 'Repeat One',
  [repeatAllMode]: 'Repeat All',
}

const Player: FC<PlayerProps> = ({className}) => {
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const currentTrack = useSelector(selectCurrentTrack);
  const position = useSelector(selectPosition);
  const isMuted = useSelector(selectIsMuted);
  const volume = useSelector(selectVolume);
  const isPending = useSelector(selectIsPlayerPending);
  const isShuffled = useSelector(selectIsShuffled);
  const repeatMode = useSelector(selectRepeatMode);
  const hasNextTrack = useSelector(selectHasNextTrack);
  const hasPrevTrack = useSelector(selectHasPrevTrack);

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

  const onShuffle = useCallback(() => {
    const action = setIsShuffled(!isShuffled);

    dispatch(action);
  }, [dispatch, isShuffled]);

  const onPlayPrev = useCallback(() => {
    const action = playPrev();

    dispatch(action);
  }, [dispatch]);

  const onPlayNext = useCallback(() => {
    const action = playNext();

    dispatch(action);
  }, [dispatch]);

  const onRepeatMode = useCallback(() => {
    let newRepeatMode: RepeatMode;

    switch (repeatMode) {
      case noRepeatMode:
        newRepeatMode = repeatAllMode;
        break;
      case repeatAllMode:
        newRepeatMode = repeatOneMode;
        break;
      case repeatOneMode:
        newRepeatMode = noRepeatMode;
        break;
      default:
        newRepeatMode = noRepeatMode;
    }

    const action = setRepeatMode(newRepeatMode);

    dispatch(action);
  }, [dispatch, repeatMode]);

  return (
    <div className={cx('player', className)}>
      {currentTrack && (
        <div>
          <b>{currentTrack.name}</b> by <b>{currentTrack.artists.join(', ')}</b>
        </div>
      )}
      {!isPlaying && (
        <button onClick={onPlay} disabled={!currentTrack || isPending}>Play</button>
      )}
      {isPlaying && (
        <button onClick={onPause}>Pause</button>
      )}
      <button onClick={onMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
      <button onClick={onPlayPrev} disabled={!hasPrevTrack}>Play Prev</button>
      <SeekBar onSeek={onSeek} position={position} duration={currentTrack?.duration} className={cx('seek-bar')}/>
      <button onClick={onPlayNext} disabled={!hasNextTrack}>Play Next</button>
      <input type='range' onChange={onVolumeChange} value={volume} min='0' max='100' step='1'/>
      <button onClick={onShuffle}>{isShuffled ? 'Shuffled' : 'Not Shuffled'}</button>
      <button onClick={onRepeatMode}>{repeatModeLabels[repeatMode]}</button>
    </div>
  );
};

export {Player};
