import classNames from 'classnames/bind';
import React, {Component} from 'react';
import axios from 'axios';

import {Search} from './components/search/search';

import styles from './app.scss';
import { SpotifyProvider } from './apis/spotify';
import { DeezerProvider } from 'apis/deezer';

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

  componentDidMount() {
    const {
      'spotify_access_token': spotifyAccessToken,
      'spotify_refresh_token': spotifyRefreshToken,
    } = document.cookie.split('; ')
      .map((cookiePair) => cookiePair.split('='))
      .reduce((cookies, [key, value]) => {
        cookies[key] = value;

        return cookies;
      }, {} as {[key: string]: string});

    this.setState({
      spotifyAccessToken,
      spotifyRefreshToken
    });
  }

  logoutSpotify = () => {
    this.setState({
      spotifyAccessToken: undefined,
      spotifyRefreshToken: undefined,
    });
  }

  logoutDeezer = () => {
    this.setState({
      deezerAccessToken: undefined,
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


  loginDeezer = async () => {
    window.open('/login-deezer');

    try {
      const deezerAccessToken = await new Promise<string>((res, rej) => {
        const onMessage = (e: MessageEvent) => {
          window.removeEventListener('message', onMessage);

          res(e.data);
        };

        window.addEventListener('message', onMessage);
      });

      this.setState({
        deezerAccessToken,
      });
    } catch (err) {
      console.log(err);
    }    
  }

  render() {
    const {spotifyAccessToken, deezerAccessToken} = this.state;
    return (
      <DeezerProvider>
      {/* <SpotifyProvider token={process.env.SPOTIFY_TOKEN as string}> */}
        <div className={cx('app')}>
          App
        </div>
        <div>
          {!spotifyAccessToken && (
            <button onClick={this.loginSpotify}>
              Connect Spotify
            </button>
          )}
          {!deezerAccessToken && (
            <button onClick={this.loginDeezer}>
              Connect Deezer
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
          {deezerAccessToken && (
            <>
              <button onClick={this.logoutDeezer}>
                Logout Deezer
              </button>
            </>
          )}
        </div>
      {/* </SpotifyProvider> */}
      </DeezerProvider>
    );
  }
}

export {App};
