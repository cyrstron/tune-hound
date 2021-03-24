import React, { FC } from "react";
import classNames from "classnames/bind";
import { TrackShort } from "../..";

import styles from "./track-list.scss";
import { OrderedTrack } from "./components/ordered-track";

const cx = classNames.bind(styles);

export interface TrackListProps {
  tracks: TrackShort[];
  className?: string;
  isPlaying?: boolean;
  isPaused?: boolean;
  isPending?: boolean;
  currentIndex?: number;
  onPlay: (index: number) => void;
  onPause: () => void;
}

const TrackListComponent: FC<TrackListProps> = ({
  tracks,
  className,
  isPlaying,
  isPaused,
  isPending,
  currentIndex,
  onPlay,
  onPause,
}) => {
  return (
    <ul className={cx("tracks-list", className)}>
      {tracks.map((track, index) => {
        const isTrackActive = index === currentIndex;

        return (
          <OrderedTrack
            key={track.id}
            className={cx("track-item")}
            index={index}
            isPlaying={isTrackActive && isPlaying}
            isPaused={isTrackActive && isPaused}
            isPending={isTrackActive && isPending}
            onPlay={onPlay}
            onPause={onPause}
            {...track}
          />
        );
      })}
    </ul>
  );
};

export { TrackListComponent };
