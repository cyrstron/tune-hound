import React, { FC, useState, useCallback } from "react";
import classNames from "classnames/bind";
import {
  SearchSource,
  SpotifySourceItem,
  DeezerSourceItem,
} from "@app/state/search/types";
import deezerLogo from "@app/resources/source-logos/deezer-logo.svg";
import spotifyLogo from "@app/resources/source-logos/spotify-logo.svg";
import { extendSearchResult } from "@app/state/search";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@app/state";
import { selectItemsForExtensionById } from "@app/state/search/selectors";
import { ExtensionPopup } from "./components/extension-popup";
import { SpotifyItemDetails } from "./components/spotify-item-details";
import { DeezerItemDetails } from "./components/deezer-item-details";

import styles from "./source-details.scss";
import { selectDeezerIsConnected } from "@app/state/deezer";
import { selectIsSpotifyConnected } from "@app/state/spotify";

const cx = classNames.bind(styles);

export interface SourceDetailsProps {
  id: string;
  isCrossExtendable: boolean;
  spotify?: SpotifySourceItem | null;
  deezer?: DeezerSourceItem | null;
  className?: string;
}

const SourceDetailsComponent: FC<SourceDetailsProps> = ({
  id,
  spotify,
  deezer,
  className,
  isCrossExtendable,
}) => {
  const [source, setSource] = useState<SearchSource | undefined>();

  const dispatch = useDispatch();
  const {
    spotify: spotifyExtensions,
    deezer: deezerExtensions,
  } = useSelector((state: AppState) => selectItemsForExtensionById(state, id));
  const isDeezerConnected = useSelector(selectDeezerIsConnected);
  const isSpotifyConnected = useSelector(selectIsSpotifyConnected);

  const hasDeezerDetails = isDeezerConnected && (isCrossExtendable || !!deezer);
  const hasSpotifyDetails =
    isSpotifyConnected && (isCrossExtendable || !!spotify);

  const onDeezerClick = useCallback(() => {
    setSource(source !== "deezer" ? "deezer" : undefined);

    if (deezer === null || (deezer && deezer.isFull)) return;

    const action = extendSearchResult(id, "deezer");

    dispatch(action);
  }, [setSource, source, deezer, id, dispatch]);

  const onSpotifyClick = useCallback(() => {
    setSource(source !== "spotify" ? "spotify" : undefined);

    if (spotify === null || (spotify && spotify.isFull)) return;

    const action = extendSearchResult(id, "spotify");

    dispatch(action);
  }, [setSource, source, spotify, id, dispatch]);

  return (
    <>
      <div className={cx("details", className)}>
        <div className={cx("controls")}>
          {hasDeezerDetails && (
            <button onClick={onDeezerClick}>
              <img
                className={cx("control-icon")}
                src={deezerLogo}
                alt="Deezer"
              />
            </button>
          )}
          {hasSpotifyDetails && (
            <button onClick={onSpotifyClick}>
              <img
                className={cx("control-icon")}
                src={spotifyLogo}
                alt="Spotify"
              />
            </button>
          )}
        </div>
        <div className={cx("content")}>
          {source === "deezer" && deezer && deezer.isFull && (
            <DeezerItemDetails
              id={id}
              item={deezer}
              className={cx("item-details")}
            />
          )}
          {source === "spotify" && spotify && spotify.isFull && (
            <SpotifyItemDetails
              id={id}
              item={spotify}
              className={cx("item-details")}
            />
          )}
          {((source === "deezer" && deezer === null) ||
            (source === "spotify" && spotify === null)) &&
            "Not found in this source :C"}
        </div>
      </div>
      <ExtensionPopup
        spotify={spotifyExtensions}
        deezer={deezerExtensions}
        id={id}
      />
    </>
  );
};

export { SourceDetailsComponent };
