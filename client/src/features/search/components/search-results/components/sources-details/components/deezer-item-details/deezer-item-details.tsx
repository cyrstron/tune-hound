import React, { FC } from "react";
import classNames from "classnames/bind";
import { DeezerSourceItemFull } from "@app/features/search/search/types";
import { DeezerTrackDetails } from "./components/deezer-track-details";
import { DeezerAlbumDetails } from "./components/deezer-album-details";
import { DeezerPlaylistDetails } from "./components/deezer-playlist-details";
import { DeezerArtistDetails } from "./components/deezer-artist-details";

const cx = classNames.bind({});

export interface DeezerItemDetailsProps {
  id: string;
  item: DeezerSourceItemFull;
  className?: string;
}

const DeezerItemDetailsComponent: FC<DeezerItemDetailsProps> = ({
  id,
  item,
  className,
}) => {
  switch (item.type) {
    case "track":
      return (
        <DeezerTrackDetails id={id} track={item} className={cx(className)} />
      );
    case "album":
      return (
        <DeezerAlbumDetails id={id} album={item} className={cx(className)} />
      );
    case "playlist":
      return (
        <DeezerPlaylistDetails
          id={id}
          playlist={item}
          className={cx(className)}
        />
      );
    case "artist":
      return (
        <DeezerArtistDetails id={id} artist={item} className={cx(className)} />
      );
    default:
      return null;
  }
};

export { DeezerItemDetailsComponent };
