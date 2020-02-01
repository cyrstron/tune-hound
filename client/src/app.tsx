import classNames from 'classnames/bind';
import React, {Component} from 'react';
import axios from 'axios';

import {Search} from './components/search/search';

import styles from './app.scss';
import { SpotifyProvider } from './apis/spotify';

const cx = classNames.bind(styles);


interface AppState {
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
}

class App extends Component<{}, AppState> {
  state: AppState = {};

  refreshToken = async () => {
    try {
      const {data: {access_token}} = await axios.get('/refresh-token', {
        params: {refresh_token: this.state.spotifyRefreshToken}
      });

      this.setState({
        spotifyAccessToken: access_token,
      });
    } catch (err) {
      console.error(err);

      this.logout();
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

  logout = () => {
    document.cookie = '';
    this.setState({
      spotifyAccessToken: undefined,
      spotifyRefreshToken: undefined,
    });
  }

  render() {
    const {spotifyAccessToken} = this.state;
    return (
      <>
      {/* <SpotifyProvider token={process.env.SPOTIFY_TOKEN as string}> */}
        <div className={cx('app')}>
          App
        </div>
        <div>
          {!spotifyAccessToken && (
            <a href='/login'>
              Login
            </a>
          )}
          {spotifyAccessToken && (
            <>
              <button onClick={this.logout}>
                Logout
              </button>
              <Search token={spotifyAccessToken} refreshToken={this.refreshToken}/>
            </>
          )}
        </div>
      {/* </SpotifyProvider> */}
      </>
    );
  }
}

export {App};
