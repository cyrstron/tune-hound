export class DeezerPlayer {
  constructor(public player: DeezerSdk.Player) {}

  playTracks(
    tracksIds: number[],
    isAutoPlay = true,
    index = 0,
    trackOffset = 0,
  ): Promise<DeezerSdk.PlayQueue> {
    return new Promise<DeezerSdk.PlayQueue>(res => {
      this.player.playTracks((tracksIds as any[]) as string[], isAutoPlay, index, trackOffset, res);
    });
  }

  play(): void {
    this.player.play();
  }

  seek(position: number): void {
    this.player.seek(position);
  }

  pause(): void {
    this.player.pause();
  }

  getTrackList(): DeezerSdk.Track[] {
    return this.player.getTrackList();
  }

  getVolume(): number {
    return this.player.getVolume();
  }

  setVolume(volume: number): void {
    this.player.setVolume(volume);
  }

  getShuffle(): boolean {
    return this.player.getShuffle();
  }

  getRepeat(): DeezerSdk.RepeatMode {
    return this.player.getRepeat();
  }

  getMute(): boolean {
    return this.player.getMute();
  }

  setMute(isMuted: boolean): void {
    this.player.setMute(isMuted);
  }

  getCurrentTrack(): DeezerSdk.Track | null {
    return this.player.getCurrentTrack() as DeezerSdk.Track | null;
  }

  getCurrentIndex(): number | null {
    return this.player.getCurrentIndex() as number | null;
  }
}
