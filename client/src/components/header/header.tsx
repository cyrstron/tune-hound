import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { DeezerCtx } from 'apis/deezer';

import { withDeezer } from 'apis/deezer/hocs/with-deezer';

import styles from './header.scss';

const cx = classNames.bind(styles);

interface HeaderProps {

}

type Props = HeaderProps & DeezerCtx;

class Header extends Component<Props> {
  connectDeezer = async () => {
    const {connectDeezer} = this.props;

    await connectDeezer();
  }

  disconnectDeezer = async () => {
    const {dz} = this.props;

    if (!dz) return;

    await dz.logout();
  }

  render() {
    const {dz} = this.props;

    return (
      <>
        <div className={cx('header')}>
          App
        </div>
        <div>
          {/* {!spotifyAccessToken && (
            <button onClick={this.loginSpotify}>
              Connect Spotify
            </button>
          )} */}
          {!dz && (
            <button onClick={this.connectDeezer}>
              Connect Deezer
            </button>
          )}
          {dz && (
            <button onClick={this.disconnectDeezer}>
              Disconnect Deezer
            </button>
          )}
          {/* {spotifyAccessToken && (
            <>
              <button onClick={this.logoutSpotify}>
                Logout Spotify
              </button>
              <Search token={spotifyAccessToken} refreshToken={this.refreshSpotifyToken}/>
            </>
          )}
          {deezerAccessToken && (
            <>
              <button onClick={this.logoutDeezer}>
                Logout Deezer
              </button>
            </>
          )} */}
        </div>
      </>
    );
  }
}

const HeaderWithDeezer = withDeezer<{}>(Header);

export {HeaderWithDeezer as Header}
