import React, { FC } from "react";
import classNames from "classnames/bind";
import { SpotifyArtistSourceItemFull } from "@app/state/search/types";
import { AlbumTiles } from "@app/components/albums";
import { mapSpotifyAlbums, mapSpotifyTracks } from "../../services/mapHelpers";
import { TrackList } from "@app/components/tracks";
import { usePlayerFromDetails } from "../../../../hooks/use-player-from-details";
import { usePlayerById } from "../../../../hooks/use-player-by-id";

import styles from "./spotify-artist-details.scss";

const cx = classNames.bind(styles);

export interface SpotifyArtistDetailsProps {
  id: string;
  artist: SpotifyArtistSourceItemFull;
  className?: string;
}

const SpotifyArtistDetailsComponent: FC<SpotifyArtistDetailsProps> = ({
  id,
  artist: {
    id: nativeId,
    topTracks,
    albums,
    followers: { total },
    genres,
  },
  className,
}) => {
  const playerProps = usePlayerFromDetails(id, "spotify", nativeId);
  const albumsProps = usePlayerById("album");
  const mappedAlbums = mapSpotifyAlbums(albums);
  const mappedTracks = mapSpotifyTracks(topTracks);

  return (
    <div className={cx("artist-details", className)}>
      {!!genres.length && <div>Genres: {genres.join(", ")}</div>}
      {!!mappedTracks.length && (
        <div>
          Top tracks:
          <TrackList tracks={mappedTracks} {...playerProps} />
        </div>
      )}
      {!!mappedAlbums.length && (
        <div>
          Albums:
          <AlbumTiles albums={mappedAlbums} {...albumsProps} />
        </div>
      )}
      <div>{total} followers</div>
    </div>
  );
};

export { SpotifyArtistDetailsComponent };
