import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { withApis, ApisCtx } from '../../apis';

import styles from './header.scss';

const cx = classNames.bind(styles);

interface HeaderProps {

}

type Props = HeaderProps & ApisCtx;

class Header extends Component<Props> {
  connectDeezer = async () => {
    const {connectDeezer} = this.props;

    await connectDeezer();
  }

  disconnectDeezer = async () => {
    const {disconnectDeezer} = this.props;

    await disconnectDeezer();
  }

  connectSpotify = async () => {
    const {connectSpotify} = this.props;
    
    await connectSpotify();
  }

  disconnectSpotify = () => {
    const {disconnectSpotify} = this.props;

    disconnectSpotify();
  }

  render() {
    const {dz, isDeezerPending, spotifyService, isSpotifyPending} = this.props;

    return (
      <>
        <div className={cx('header')}>
          App
        </div>
        <div>
          {isDeezerPending && (
            <span>
              Checking Deezer connection...
            </span>
          )}
          {!dz && !isDeezerPending && (
            <button onClick={this.connectDeezer}>
              Connect Deezer
            </button>
          )}
          {dz && (
            <button onClick={this.disconnectDeezer}>
              Disconnect Deezer
            </button>
          )}
          {isSpotifyPending && (
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
          )}
        </div>
      </>
    );
  }
}

const HeaderWithApis = withApis<{}>(Header);

export {HeaderWithApis as Header}
