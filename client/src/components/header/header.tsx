import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withApis, ApisCtx } from '../apis';

import styles from './header.scss';
import { FlashPopup } from './components/flash-popup';
import { Search } from '../search';

const cx = classNames.bind(styles);

interface HeaderProps {
  isDeezerConnected: boolean;
  wasDeezerConnected: boolean;
  isDeezerPending: boolean;
  deezerError?: Error;
  connectDeezer: () => void;
  disconnectDeezer: () => void;
}

type Props = HeaderProps;

class HeaderComponent extends Component<Props> {
  componentDidMount() {
    const {wasDeezerConnected, connectDeezer} = this.props;

    if (wasDeezerConnected) {
      connectDeezer();
    }
  }

  connectDeezer = async () => {
    const {connectDeezer} = this.props;

    await connectDeezer();
  }

  disconnectDeezer = async () => {
    const {disconnectDeezer} = this.props;

    await disconnectDeezer();
  }

  // connectSpotify = async () => {
  //   const {connectSpotify} = this.props;
    
  //   await connectSpotify();
  // }

  // disconnectSpotify = () => {
  //   const {disconnectSpotify} = this.props;

  //   disconnectSpotify();
  // }

  render() {
    const {
      // dz, 
      isDeezerPending, 
      isDeezerConnected
      // spotifyService, 
      // isSpotifyPending
    } = this.props;

    return (
      <>
      <FlashPopup />
        <div className={cx('header')}>
          App
        </div>
        <div>
          {isDeezerPending && (
            <span>
              Loading...
            </span>
          )}
          {!isDeezerConnected && !isDeezerPending && (
            <button onClick={this.connectDeezer}>
              Connect Deezer
            </button>
          )}
          {isDeezerConnected && (
            <button onClick={this.disconnectDeezer}>
              Disconnect Deezer
            </button>
          )}
          {/* {isSpotifyPending && (
            <span>
              Checking Spotify connection...
            </span>
          )}
          {!spotifyService && !isSpotifyPending && (
            <button onClick={this.connectSpotify}>
              Connect Spotify
            </button>
          )}
          {spotifyService && (
            <button onClick={this.disconnectSpotify}>
              Disconnect Spotify
            </button>
          )} */}
        </div>
        <Search />
      </>
    );
  }
}

export {HeaderComponent}
