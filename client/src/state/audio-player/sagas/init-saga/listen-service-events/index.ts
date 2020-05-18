import {all, spawn} from 'redux-saga/effects';
import {AudioService} from '@app/state/audio-player';
import {createAudioPlayChannel, watchAudioPlayChange} from './listen-play';
import {createAudioUrlChangeChannel, watchAudioUrlChange} from './listen-url-change';
import {createAudioPauseChannel, watchAudioPauseChange} from './listen-pause';
import {createAudioProgressChannel, watchAudioProgressChange} from './listen-progress';
import {createAudioCurrentTimeChannel, watchAudioCurrentTimeChange} from './listen-time-update';
import {createAudioWaitingChannel, watchAudioWaitingChange} from './listen-waiting';
import {createAudioVolumeChannel, watchAudioVolumeChange} from './listen-volume-change';
import {createEndedChannel, watchEnded} from './listen-ended';

export function* listenAudioEvents(audioService: AudioService): any {
  const playChannel = createAudioPlayChannel(audioService);
  const currentUrlChannel = createAudioUrlChangeChannel(audioService);
  const pauseChannel = createAudioPauseChannel(audioService);
  const progressChannel = createAudioProgressChannel(audioService);
  const currentTimeChannel = createAudioCurrentTimeChannel(audioService);
  const volumeChannel = createAudioVolumeChannel(audioService);
  const waitingChannel = createAudioWaitingChannel(audioService);
  const endedChannel = createEndedChannel(audioService);

  yield all([
    spawn(watchAudioPlayChange, audioService, playChannel),
    spawn(watchAudioUrlChange, audioService, currentUrlChannel),
    spawn(watchAudioPauseChange, pauseChannel),
    spawn(watchAudioProgressChange, progressChannel),
    spawn(watchAudioVolumeChange, audioService, volumeChannel),
    spawn(watchAudioCurrentTimeChange, audioService, currentTimeChannel),
    spawn(watchAudioWaitingChange, waitingChannel),
    spawn(watchEnded, audioService, endedChannel),
  ]);

  return {
    playChannel,
    currentUrlChannel,
    pauseChannel,
    progressChannel,
    currentTimeChannel,
    volumeChannel,
    waitingChannel,
    endedChannel,
  };
}
