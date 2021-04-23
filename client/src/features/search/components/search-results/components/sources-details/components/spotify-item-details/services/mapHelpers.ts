import { AlbumShort } from '@app/components/albums';
import { SearchSource } from '@app/features/search/state/types';
import { MediaSource, MediaType, TrackShort } from '@app/types/media';

export function mapSpotifyTracks(tracks: SpotifyApi.TrackObjectSimplified[]): TrackShort[] {
  return tracks.map(({ name, artists, id }) => ({
    type: MediaType.TRACK,
    id: `${MediaSource.SPOTIFY}:${id}`,
    sourceIds: {
      [MediaSource.SPOTIFY]: id,
    },
    title: name,
    artists: artists.map(({ name }) => name),
  }));
}

export function mapSpotifyAlbums(albums: SpotifyApi.AlbumObjectSimplified[]): AlbumShort[] {
  return albums.map(({ id, name, release_date: releaseDate, images: [{ url }] }) => ({
    id,
    coverUrl: url,
    title: name,
    year: new Date(Date.parse(releaseDate)).getFullYear(),
    source: SearchSource.SPOTIFY,
  }));
}
