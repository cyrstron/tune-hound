import { SearchResult, SearchSource } from "../../types";
import { select, all } from "redux-saga/effects";
import { selectCanDeezerPlay } from "@app/state/deezer";
import { selectCanSpotifyPlay } from "@app/state/spotify";

export function* pickDefaultSource(searchItem: SearchResult) {
  const availableSources = Object.keys(searchItem.sources) as SearchSource[];

  if (availableSources.length === 1) return availableSources[0];

  const [canDeezerPlay, canSpotifyPlay]: [boolean, boolean] = yield all([
    select(selectCanDeezerPlay),
    select(selectCanSpotifyPlay),
  ])

  const canSourcesPlay = {
    deezer: canDeezerPlay,
    spotify: canSpotifyPlay
  };

  return availableSources.find((source) => canSourcesPlay[source]) || availableSources[0];
}