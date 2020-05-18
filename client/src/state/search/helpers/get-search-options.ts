import {SearchResult, SearchOptions, SearchSource} from '../types';

function getSpotifySearchOptions(item: SearchResult): SearchOptions[] {
  if (item.type === 'track') {
    const {name, album, artists} = item;

    return artists.map((artist) => ({
      type: 'track',
      query: {
        and: [name],
        album,
        artist,
      },
    }));
  } else if (item.type === 'album') {
    const {title, artists} = item;

    return artists.map((artist) => ({
      type: 'album',
      query: {
        and: [title],
        artist,
      },
    }));
  } else if (item.type === 'artist') {
    const {name} = item;

    return [{
      type: 'artist',
      query: {
        and: [name],
      },
    }];
  } else {
    return [];
  }
}

function getDeezerSearchOptions(item: SearchResult): SearchOptions[] {
  if (item.type === 'track') {
    const {name, album, artists} = item;

    return artists.map((artist) => ({
      namespace: 'track',
      query: {
        track: name,
        album,
        artist,
      },
      strict: true,
    }));
  } else if (item.type === 'album') {
    const {title, artists} = item;

    return artists.map((artist) => ({
      namespace: 'album',
      query: {album: title, artist: artist},
      strict: true,
    }));
  } else if (item.type === 'artist') {
    const {name} = item;

    return [{
      namespace: 'artist',
      query: {artist: name},
      strict: true,
    }];
  } else {
    return [];
  }
}

export function getSearchOptions(item: SearchResult, source: SearchSource): SearchOptions[] {
  if (source === 'spotify') {
    return getSpotifySearchOptions(item);
  } else if (source === 'deezer') {
    return getDeezerSearchOptions(item);
  } else {
    return [];
  }
}
