import React, { FC } from "react";
import classNames from "classnames/bind";

import styles from "./spotify-full-artist-item.scss";
import { SpotifyArtistSourceItemFull } from "@app/features/search/search/types";

const cx = classNames.bind(styles);

export interface SpotifyFullArtistItemProps {
  artist: SpotifyArtistSourceItemFull;
  className?: string;
}

const SpotifyFullArtistItemComponent: FC<SpotifyFullArtistItemProps> = ({
  artist: { name },
  className,
}) => {
  return (
    <div className={cx("artist", className)}>
      <div>Name: {name}</div>
    </div>
  );
};

export { SpotifyFullArtistItemComponent };
