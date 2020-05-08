export class DeezerPlayer {
  constructor(
    public player: DeezerSdk.Player,
  ) {}

  playTracks(
    tracksIds: number[], 
    isAutoPlay: boolean = true, 
    index: number = 0, 
    trackOffset: number = 0,
  ) {
    return new Promise((res) => {
      this.player.playTracks(tracksIds as any[] as string[], isAutoPlay, index, trackOffset, res);
    });
  }

  play() {
    this.player.play();
  }

  seek(position: number) {
    this.player.seek(position);
  }

  pause() {
    this.player.pause();
  }

  getTrackList() {
    return this.player.getTrackList();
  }

  getVolume() {
    return this.player.getVolume();
  }

  setVolume(volume: number) {
    this.player.setVolume(volume);
  }

  getShuffle() {
    return this.player.getShuffle();
  }

  getRepeat() {
    return this.player.getRepeat();
  }

  getMute() {
    return this.player.getMute();
  }

  setMute(isMuted: boolean) {
    this.player.setMute(isMuted);
  }

  getCurrentTrack() {
    return this.player.getCurrentTrack() as DeezerSdk.Track | null;
  }

  getCurrentIndex() {
    return this.player.getCurrentIndex() as number | null;
  }
}