import React, { FC, useCallback } from "react";
import classNames from "classnames/bind";

import styles from "./album-tile.scss";
import { CoverPlayBtn } from "@app/components/cover-play-btn";
import { SearchSource } from "@app/state/search/types";

const cx = classNames.bind(styles);

export interface AlbumTileProps {
  id: string | number;
  source: SearchSource;
  coverUrl: string;
  title: string;
  year?: number;
  className?: string;
  onPlay: (id: string | number, source: SearchSource) => void;
  onPause: () => void;
  isPending: boolean;
  isPlaying: boolean;
  isPaused: boolean;
}

const AlbumTileComponent: FC<AlbumTileProps> = ({
  id,
  source,
  coverUrl,
  title,
  year,
  className,
  onPlay,
  onPause,
  isPending,
  isPlaying,
  isPaused,
}) => {
  const handlePlay = useCallback(() => {
    onPlay(id, source);
  }, [onPlay, id, source]);

  return (
    <div className={cx("album", className)}>
      <CoverPlayBtn
        className={cx("cover")}
        src={coverUrl}
        title={title}
        onPlay={handlePlay}
        onPause={onPause}
        isPending={isPending}
        isPlaying={isPlaying}
        isPaused={isPaused}
      />
      <div>{title}</div>
      {year && <div>Year: {year}</div>}
    </div>
  );
};

export { AlbumTileComponent };
