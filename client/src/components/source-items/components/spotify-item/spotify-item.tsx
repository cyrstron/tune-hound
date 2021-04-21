import React, { FC } from "react";
import { SpotifySourceItemShort } from "@app/features/search/search/types";
import { SpotifyTrackItem } from "./components/spotify-track-item";
import { SpotifyAlbumItem } from "./components/spotify-album-item";
import { SpotifyArtistItem } from "./components/spotify-artist-item";

export interface SpotifyItemProps {
  object: SpotifySourceItemShort;
}

const SpotifyItemComponent: FC<SpotifyItemProps> = ({ object }) => {
  switch (object.type) {
    case "track":
      return <SpotifyTrackItem track={object} />;
    case "album":
      return <SpotifyAlbumItem album={object} />;
    case "artist":
      return <SpotifyArtistItem artist={object} />;
    default:
      return null;
  }
};

export { SpotifyItemComponent };
