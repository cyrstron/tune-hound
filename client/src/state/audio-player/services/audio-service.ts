export interface AudioServiceListeners {
  onPlay: (e: Event) => void;
  onUrlChange: (url: string) => void;
  onPause: (e: Event) => void;
  onProgress: (e: ProgressEvent<EventTarget>) => void;
  onSeekend: (e: Event) => void;
  onTimeUpdated: (e: Event) => void;
  onVolumeChange: (e: Event) => void;
  onWaiting: (e: Event) => void;
  onPlaying: (e: Event) => void;
}

export class AudioService {
  audioElement?: HTMLAudioElement;

  defaultVolume?: number;
  defaultMute = false;

  onPlay?: (e: Event) => void;
  onPause?: (e: Event) => void;
  onProgress?: (e: ProgressEvent<EventTarget>) => void;
  onSeekend?: (e: Event) => void;
  onTimeUpdated?: (e: Event) => void;
  onVolumeChange?: (e: Event) => void;
  onWaiting?: (e: Event) => void;
  onPlaying?: (e: Event) => void;
  onUrlChange?: (url: string) => void;
  onTrackEnded?: (e: Event) => void;

  mountAudio(): void {
    this.onPlay && this.audio.addEventListener('play', this.onPlay);
    this.onPause && this.audio.addEventListener('pause', this.onPause);
    this.onProgress && this.audio.addEventListener('progress', this.onProgress);
    this.onSeekend && this.audio.addEventListener('seekend', this.onSeekend);
    this.onTimeUpdated && this.audio.addEventListener('timeupdate', this.onTimeUpdated);
    this.onVolumeChange && this.audio.addEventListener('volumechange', this.onVolumeChange);
    this.onWaiting && this.audio.addEventListener('waiting', this.onWaiting);
    this.onPlaying && this.audio.addEventListener('playing', this.onPlaying);
    this.onTrackEnded && this.audio.addEventListener('ended', this.onTrackEnded);
  }

  unmountAudio(): void {
    if (!this.audioElement) return;

    this.audio.addEventListener;

    if (!this.audioElement.paused) {
      this.audio.pause();
    }

    this.onPlay && this.audio.removeEventListener('play', this.onPlay);
    this.onPause && this.audio.removeEventListener('pause', this.onPause);
    this.onProgress && this.audio.removeEventListener('progress', this.onProgress);
    this.onSeekend && this.audio.removeEventListener('seekend', this.onSeekend);
    this.onTimeUpdated && this.audio.removeEventListener('timeupdate', this.onTimeUpdated);
    this.onVolumeChange && this.audio.removeEventListener('volumechange', this.onVolumeChange);
    this.onWaiting && this.audio.removeEventListener('waiting', this.onWaiting);
    this.onPlaying && this.audio.removeEventListener('playing', this.onPlaying);
    this.onTrackEnded && this.audio.removeEventListener('ended', this.onTrackEnded);
  }

  get currentUrl(): string | null {
    return this.audioElement?.src || null;
  }

  get currentTime(): number {
    return this.audioElement?.currentTime || 0;
  }

  addEventListener(eventType: 'play', handler: (e: Event) => void): void;
  addEventListener(eventType: 'pause', handler: (e: Event) => void): void;
  addEventListener(eventType: 'seekend', handler: (e: Event) => void): void;
  addEventListener(eventType: 'timeupdate', handler: (e: Event) => void): void;
  addEventListener(eventType: 'volumechange', handler: (e: Event) => void): void;
  addEventListener(eventType: 'waiting', handler: (e: Event) => void): void;
  addEventListener(eventType: 'ended', handler: (e: Event) => void): void;
  addEventListener(eventType: 'playing', handler: (e: Event) => void): void;
  addEventListener(eventType: 'progress', handler: (e: ProgressEvent<EventTarget>) => void): void;
  addEventListener(eventType: 'urlchange', handler: (url: string) => void): void;
  addEventListener(
    eventType:
      | 'urlchange'
      | 'ended'
      | 'play'
      | 'pause'
      | 'seekend'
      | 'timeupdate'
      | 'volumechange'
      | 'waiting'
      | 'playing'
      | 'progress',
    handler:
      | ((e: Event) => void)
      | ((e: ProgressEvent<EventTarget>) => void)
      | ((url: string) => void),
  ): void {
    switch (eventType) {
      case 'play':
        this.onPlay = handler as (e: Event) => void;
        break;
      case 'pause':
        this.onPause = handler as (e: Event) => void;
        break;
      case 'seekend':
        this.onSeekend = handler as (e: Event) => void;
        break;
      case 'timeupdate':
        this.onTimeUpdated = handler as (e: Event) => void;
        break;
      case 'volumechange':
        this.onVolumeChange = handler as (e: Event) => void;
        break;
      case 'waiting':
        this.onWaiting = handler as (e: Event) => void;
        break;
      case 'urlchange':
        this.onUrlChange = handler as (url: string) => void;
        break;
      case 'playing':
        this.onPlaying = handler as (e: Event) => void;
        break;
      case 'progress':
        this.onProgress = handler as (e: ProgressEvent<EventTarget>) => void;
        break;
      case 'ended':
        this.onTrackEnded = handler as (e: Event) => void;
        break;
    }
  }

  async setAudio(url: string, isAutoplay = true): Promise<void> {
    this.unmountAudio();

    const audio = new Audio(url);

    audio.volume = this.defaultVolume || 0;
    audio.muted = this.defaultMute;

    this.audioElement = audio;

    this.mountAudio();

    this.onUrlChange && this.onUrlChange(url);

    await new Promise<void>((resolve, reject) => {
      const onReady = (): void => {
        audio.removeEventListener('canplay', onReady);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        audio.removeEventListener('error', onError);

        resolve();
      };

      const onError = (err: ErrorEvent): void => {
        audio.removeEventListener('canplay', onReady);
        audio.removeEventListener('error', onError);

        reject(err);
      };

      audio.addEventListener('canplay', onReady);
      audio.addEventListener('error', onError);
    });

    if (!isAutoplay) return;

    this.play();
  }

  async seek(seek: number): Promise<void> {
    const audio = this.audio;

    audio.currentTime = seek;

    await new Promise<void>(res => {
      const onSeekEnd = (): void => {
        audio.removeEventListener('seeked', onSeekEnd);

        res();
      };

      audio.addEventListener('seeked', onSeekEnd);
    });
  }

  play(): void {
    this.audio?.play();
  }

  pause(): void {
    this.audio?.pause();
  }

  setMute(isMuted: boolean): void {
    this.defaultMute = isMuted;

    if (!this.audioElement) return;

    this.audioElement.muted = isMuted;
  }

  setVolume(volume: number): void {
    this.defaultVolume = volume;

    if (!this.audioElement) return;

    this.audioElement.volume = volume;
  }

  get audio(): HTMLAudioElement {
    if (!this.audioElement) {
      throw new Error('No audio initialized');
    }

    return this.audioElement;
  }

  get volume(): number {
    return this.defaultVolume || 0;
  }

  get buffered(): [number, number][] {
    if (!this.audioElement) return [];

    const { buffered } = this.audioElement;

    const progress: [number, number][] = [];

    for (let i = 0, len = buffered.length; i < len; i += 1) {
      progress.push([buffered.start(i), buffered.end(i)]);
    }

    return progress;
  }
}
