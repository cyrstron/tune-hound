import React, { Component } from "react";
import classNames from "classnames/bind";

import styles from "./header.scss";
import { FlashPopup } from "./components/flash-popup";
import { ActivePlayerPopup } from "./components/active-player-popup";

const cx = classNames.bind(styles);

interface HeaderProps {
  className?: string;
  isDeezerConnected: boolean;
  wasDeezerConnected: boolean;
  isDeezerPending: boolean;
  deezerError?: Error;
  connectDeezer: () => void;
  disconnectDeezer: () => void;
  isSpotifyConnected: boolean;
  wasSpotifyConnected: boolean;
  isSpotifyPending: boolean;
  spotifyError?: Error;
  connectSpotify: () => void;
  disconnectSpotify: () => void;
}

type Props = HeaderProps;

class HeaderComponent extends Component<Props> {
  componentDidMount() {
    const {
      wasDeezerConnected,
      connectDeezer,
      wasSpotifyConnected,
      connectSpotify,
    } = this.props;

    if (wasDeezerConnected) {
      connectDeezer();
    }

    if (wasSpotifyConnected) {
      connectSpotify();
    }
  }

  connectDeezer = async () => {
    const { connectDeezer } = this.props;

    await connectDeezer();
  };

  disconnectDeezer = async () => {
    const { disconnectDeezer } = this.props;

    await disconnectDeezer();
  };

  connectSpotify = async () => {
    const { connectSpotify } = this.props;

    connectSpotify();
  };

  disconnectSpotify = () => {
    const { disconnectSpotify } = this.props;

    disconnectSpotify();
  };

  render() {
    const {
      isDeezerPending,
      isDeezerConnected,
      isSpotifyPending,
      isSpotifyConnected,
      className,
    } = this.props;

    return (
      <>
        <div className={cx("header", className)}>App</div>
        <div>
          {isDeezerPending && <span>Loading...</span>}
          {!isDeezerConnected && !isDeezerPending && (
            <button onClick={this.connectDeezer}>Connect Deezer</button>
          )}
          {isDeezerConnected && (
            <button onClick={this.disconnectDeezer}>Disconnect Deezer</button>
          )}
          {isSpotifyPending && <span>Checking Spotify connection...</span>}
          {!isSpotifyConnected && !isSpotifyPending && (
            <button onClick={this.connectSpotify}>Connect Spotify</button>
          )}
          {isSpotifyConnected && (
            <button onClick={this.disconnectSpotify}>Disconnect Spotify</button>
          )}
        </div>
        <FlashPopup />
        <ActivePlayerPopup />
      </>
    );
  }
}

export { HeaderComponent };
