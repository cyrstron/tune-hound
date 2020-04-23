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
    return new Promise((res, rej) => {
      this.player.playTracks(tracksIds as any as string[], isAutoPlay, index, trackOffset, (queue) => {
        console.log(queue);
        res();
      });
    });
  }
}