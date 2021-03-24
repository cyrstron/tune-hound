import React, { FC, useCallback } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { selectHasPrevTrack } from "@app/state/player/selectors";
import { playPrev } from "@app/state/player/actions";

import styles from "./play-prev-control.scss";

const cx = classNames.bind(styles);

export interface PlayPrevControlProps {
  className?: string;
}

const PlayPrevControl: FC<PlayPrevControlProps> = ({ className }) => {
  const dispatch = useDispatch();

  const hasPrevTrack = useSelector(selectHasPrevTrack);

  const onPlayPrev = useCallback(() => {
    const action = playPrev();

    dispatch(action);
  }, [dispatch]);

  return (
    <div className={cx("play-prev-control", className)}>
      <button
        onClick={onPlayPrev}
        disabled={!hasPrevTrack}
        className={cx("play-prev-btn")}
      >
        Play Previous
      </button>
    </div>
  );
};

export { PlayPrevControl };
