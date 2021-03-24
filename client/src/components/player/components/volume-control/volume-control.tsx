import React, { FC, useCallback, ChangeEvent } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { selectIsMuted, selectVolume } from "@app/state/player/selectors";
import { setIsMuted, setVolume } from "@app/state/player/actions";

import styles from "./volume-control.scss";

const cx = classNames.bind(styles);

export interface PlayerProps {
  className?: string;
}

const VolumeControl: FC<PlayerProps> = ({ className }) => {
  const dispatch = useDispatch();
  const isMuted = useSelector(selectIsMuted);
  const volume = useSelector(selectVolume);

  const onMute = useCallback(() => {
    const action = setIsMuted(!isMuted);

    dispatch(action);
  }, [dispatch, isMuted]);

  const onVolumeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const volume = +e.target.value;

      const action = setVolume(volume);

      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className={cx("volume-control", className)}>
      <button onClick={onMute}>{isMuted ? "Unmute" : "Mute"}</button>
      <input
        type="range"
        onChange={onVolumeChange}
        value={volume}
        min="0"
        max="100"
        step="1"
      />
    </div>
  );
};

export { VolumeControl };
