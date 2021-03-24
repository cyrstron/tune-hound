import React, { FC } from "react";
import classNames from "classnames/bind";
import { DeezerAlbumSourceItemShort } from "@app/state/search/types";

import styles from "./deezer-album-item.scss";

const cx = classNames.bind(styles);

export interface DeezerAlbumItemProps {
  album: DeezerAlbumSourceItemShort;
  className?: string;
}

const DeezerAlbumItemComponent: FC<DeezerAlbumItemProps> = ({
  album: { title, artist, nb_tracks: tracksNumber },
  className,
}) => {
  return (
    <>
      <div className={cx("album", className)}>
        <div>Name: {title}</div>
        <div>Artist: {artist.name}</div>
        <div>{tracksNumber} tracks</div>
      </div>
    </>
  );
};

export { DeezerAlbumItemComponent };
