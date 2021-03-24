import React, { FC } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { selectCurrentTrack } from "@app/state/player/selectors";

import styles from "./track-info.scss";

const cx = classNames.bind(styles);

export interface TrackInfoProps {
  className?: string;
}

const TrackInfo: FC<TrackInfoProps> = ({ className }) => {
  const currentTrack = useSelector(selectCurrentTrack);

  return (
    <div
      className={cx("track-info", className, {
        empty: !currentTrack,
      })}
    >
      {currentTrack && (
        <div>
          <b>{currentTrack.name}</b> by <b>{currentTrack.artists.join(", ")}</b>
        </div>
      )}
    </div>
  );
};

export { TrackInfo };
