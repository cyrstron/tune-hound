import React, { FC, useCallback } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { selectRepeatMode } from "@app/state/player/selectors";
import {
  noRepeatMode,
  repeatAllMode,
  repeatOneMode,
  RepeatMode,
} from "@app/state/player/types";

import styles from "./repeat-control.scss";
import { setRepeatMode } from "@app/state/player/actions";

const cx = classNames.bind(styles);

export interface RepeatControlProps {
  className?: string;
}

const repeatModeLabels = {
  [noRepeatMode]: "No repeat",
  [repeatOneMode]: "Repeat One",
  [repeatAllMode]: "Repeat All",
};

const RepeatControl: FC<RepeatControlProps> = ({ className }) => {
  const dispatch = useDispatch();

  const repeatMode = useSelector(selectRepeatMode);

  const onRepeatMode = useCallback(() => {
    let newRepeatMode: RepeatMode;

    switch (repeatMode) {
      case noRepeatMode:
        newRepeatMode = repeatAllMode;
        break;
      case repeatAllMode:
        newRepeatMode = repeatOneMode;
        break;
      case repeatOneMode:
        newRepeatMode = noRepeatMode;
        break;
      default:
        newRepeatMode = noRepeatMode;
    }

    const action = setRepeatMode(newRepeatMode);

    dispatch(action);
  }, [dispatch, repeatMode]);

  return (
    <div className={cx("repeat-control", className)}>
      <button onClick={onRepeatMode} className={cx("repeat-btn")}>
        {repeatModeLabels[repeatMode]}
      </button>
    </div>
  );
};

export { RepeatControl };
