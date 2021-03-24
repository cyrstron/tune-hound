import React, { FC, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./player.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentTrack,
  selectPosition,
} from "@app/state/player/selectors";
import { seek } from "@app/state/player/actions";
import { SeekBar } from "./components/seek-bar/seek-bar";
import { PlayControl } from "./components/play-control";
import { PlayNextControl } from "./components/play-next-control";
import { PlayPrevControl } from "./components/play-prev-control";
import { RepeatControl } from "./components/repeat-control";
import { ShuffleControl } from "./components/shuffle-control";
import { VolumeControl } from "./components/volume-control";
import { TrackInfo } from "./components/track-info";

const cx = classNames.bind(styles);

export interface PlayerProps {
  className?: string;
}

const Player: FC<PlayerProps> = ({ className }) => {
  const dispatch = useDispatch();
  const currentTrack = useSelector(selectCurrentTrack);
  const position = useSelector(selectPosition);

  const onSeek = useCallback(
    (position: number) => {
      const action = seek(position);

      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className={cx("player", className)}>
      <div className={cx("info-wrapper")}>
        <TrackInfo className={cx("track-info")} />
      </div>
      <div className={cx("controls")}>
        <div className={cx("top-controls")}>
          <ShuffleControl className={cx("shuffle-control")} />
          <PlayPrevControl className={cx("play-prev-control")} />
          <PlayControl className={cx("play-control")} />
          <PlayNextControl className={cx("play-next-control")} />
          <RepeatControl className={cx("repeat-control")} />
        </div>
        <SeekBar
          onSeek={onSeek}
          position={position}
          duration={currentTrack?.duration}
          className={cx("seek-bar")}
        />
      </div>
      <div className={cx("volume-wrapper")}>
        <VolumeControl className={cx("volume-control")} />
      </div>
    </div>
  );
};

export { Player };
