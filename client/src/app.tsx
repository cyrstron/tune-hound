import classNames from 'classnames/bind';
import React, {Component} from 'react';
import axios from 'axios';

import {Search} from './components/search/search';

import styles from './app.scss';
import { SpotifyProvider } from './apis/spotify';
import { DeezerProvider } from 'apis/deezer';
import { withDeezer } from 'apis/deezer/hocs/with-deezer';
import { DeezerService } from 'apis/deezer/services/deezer-service';
import { Header } from 'components/header/header';

const cx = classNames.bind(styles);


interface AppState {
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
  deezerAccessToken?: string;
}

class App extends Component<{}, AppState> {
  state: AppState = {};

  refreshSpotifyToken = async () => {
    try {
      const {data: {access_token}} = await axios.get('/refresh-token', {
        params: {refresh_token: this.state.spotifyRefreshToken}
      });

      this.setState({
        spotifyAccessToken: access_token,
      });
    } catch (err) {
      console.error(err);

      this.logoutSpotify();
    }
  }

  logoutSpotify = () => {
    this.setState({
      spotifyAccessToken: undefined,
      spotifyRefreshToken: undefined,
    });
  }

  loginSpotify = async () => {
    window.open('/login-spotify');

    try {
      const {accessToken, refreshToken} = await new Promise<{
        accessToken: string, 
        refreshToken: string
      }>((res, rej) => {
        const onMessage = (e: MessageEvent) => {
          window.removeEventListener('message', onMessage);

          res(e.data);
        };

        window.addEventListener('message', onMessage);
      });

      this.setState({
        spotifyAccessToken: accessToken,
        spotifyRefreshToken: refreshToken,
      })
    } catch (err) {
      console.log(err);
    }    
  }

  render() {
    const {spotifyAccessToken, deezerAccessToken} = this.state;
    return (
      <>
        <Header />
        <div className={cx('app')}>
          App
        </div>
        <div>
          {!spotifyAccessToken && (
            <button onClick={this.loginSpotify}>
              Connect Spotify
            </button>
          )}
          {spotifyAccessToken && (
            <>
              <button onClick={this.logoutSpotify}>
                Logout Spotify
              </button>
              <Search token={spotifyAccessToken} refreshToken={this.refreshSpotifyToken}/>
            </>
          )}
        </div>
      </>
    );
  }
}

export {App};
