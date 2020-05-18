import {TrackShort} from '@app/components/tracks';
import {AlbumShort} from '@app/components/albums';

export function mapSpotifyTracks(tracks: SpotifyApi.TrackObjectSimplified[]): TrackShort[] {
  return tracks.map(({
    name,
    artists,
    id,
  }) => ({
    id,
    title: name,
    artists: artists.map(({name}) => name),
  }));
}

export function mapSpotifyAlbums(albums: SpotifyApi.AlbumObjectSimplified[]): AlbumShort[] {
  return albums.map(({
    id,
    name,
    'release_date': releaseDate,
    images: [{url}],
  }) => ({
    id,
    coverUrl: url,
    title: name,
    year: new Date(Date.parse(releaseDate)).getFullYear(),
    source: 'spotify',
  }));
}
