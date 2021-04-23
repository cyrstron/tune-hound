export enum MediaSource {
  DEEZER = 'deezer',
  SPOTIFY = 'spotify',
}

export type MediaSourceDict<T> = {
  [Key in MediaSource]?: T;
};
