import { DeezerTrack, DeezerAlbum } from '@app/state/deezer/types';
import { AlbumShort } from '@app/components/albums';
import { SearchSource } from '@app/features/search/state/types';
import { MediaSource, MediaType, TrackShort } from '@app/types/media';

export function mapDeezerTracks(tracks: Omit<DeezerTrack, 'album'>[]): TrackShort[] {
  return tracks.map(
    ({
      title,
      artist: { name: artist },
      id,
      explicit_lyrics: isLyricsExplicit,
      readable,
      preview,
    }) => ({
      id: `${MediaSource.DEEZER}:${id}`,
      type: MediaType.TRACK,
      sourceIds: {
        [MediaSource.DEEZER]: id,
      },
      title,
      artists: [artist],
      isExplicit: isLyricsExplicit,
      playable: { [MediaSource.DEEZER]: readable },
      previewUrls: { [MediaSource.DEEZER]: preview },
    }),
  );
}

export function mapDeezerAlbums(albums: DeezerAlbum[]): AlbumShort[] {
  return albums.map(({ id, title, cover_medium: coverUrl }) => ({
    id,
    title,
    coverUrl,
    source: SearchSource.DEEZER,
  }));
}
