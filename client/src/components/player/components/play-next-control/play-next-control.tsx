import React, { FC, useCallback } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { selectHasNextTrack } from "@app/state/player/selectors";
import { playNext } from "@app/state/player/actions";

import styles from "./play-next-control.scss";

const cx = classNames.bind(styles);

export interface PlayNextControlProps {
  className?: string;
}

const PlayNextControl: FC<PlayNextControlProps> = ({ className }) => {
  const dispatch = useDispatch();

  const hasNextTrack = useSelector(selectHasNextTrack);

  const onPlayNext = useCallback(() => {
    const action = playNext();

    dispatch(action);
  }, [dispatch]);

  return (
    <div className={cx("play-next-control", className)}>
      <button
        onClick={onPlayNext}
        disabled={!hasNextTrack}
        className={cx("play-next-btn")}
      >
        Play Next
      </button>
    </div>
  );
};

export { PlayNextControl };
