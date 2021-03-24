import React, { FC } from "react";
import classNames from "classnames/bind";
import { DeezerAlbumSourceItemFull } from "@app/state/search/types";

import styles from "./deezer-full-album-item.scss";

const cx = classNames.bind(styles);

export interface DeezerFullAlbumItemProps {
  album: DeezerAlbumSourceItemFull;
  className?: string;
}

const DeezerFullAlbumItemComponent: FC<DeezerFullAlbumItemProps> = ({
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

export { DeezerFullAlbumItemComponent };
