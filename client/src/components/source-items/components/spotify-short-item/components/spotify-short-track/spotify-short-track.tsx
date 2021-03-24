import React, { FC } from "react";
import classNames from "classnames/bind";

import styles from "./spotify-short-track.scss";

const cx = classNames.bind(styles);

export interface SpotifyShortTrackProps {
  track: SpotifyApi.TrackObjectSimplified;
  className?: string;
}

const SpotifyShortTrackComponent: FC<SpotifyShortTrackProps> = ({
  track: { name, artists },
  className,
}) => {
  return (
    <div className={cx("track", className)}>
      <div>
        <b>{name}</b> by <b>{artists.map(({ name }) => name).join(", ")}</b>
      </div>
    </div>
  );
};

export { SpotifyShortTrackComponent };
