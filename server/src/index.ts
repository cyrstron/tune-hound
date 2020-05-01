import express from 'express';
import axios from 'axios';
import path from 'path';
import qs from 'querystring';
import ejs from 'ejs';

import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const app = express();
const port = process.env.PORT || 3001;

app.get('/login-spotify', (_req, res) => {
  res.redirect(`https://accounts.spotify.com/authorize?${
    qs.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state user-read-currently-playing',
      redirect_uri: `${process.env.HOST}/spotify-callback`,
    })
  }`);
});

app.get('/login-deezer', (_req, res) => {
  res.redirect(`https://connect.deezer.com/oauth/auth.php?${
    qs.stringify({
      app_id: process.env.DEEZER_CLIENT_ID,
      perms: 'basic_access,email,listening_history,offline_access,manage_library,manage_community,delete_library',
      redirect_uri: `${process.env.HOST}/deezer-callback`,
    })
  }`);
});

app.get('/deezer-channel', async (_req, res) => {
  res.setHeader("Pragma", "public");
  res.setHeader("Cache-Control", `maxage=${60 * 60 * 24 * 365}`);
  res.sendFile(path.resolve(__dirname, './views/deezer-channel.html'));
});

app.get('/deezer-test', async (_req, res) => {
  res.sendFile(path.resolve(__dirname, './views/deezer-test.html'));
});

app.get('/spotify-callback', async (req, res) => {
  const code: string | null = req.query.code || null;

  const dateNow = Date.now();

  try {
    const {
      data: {
        'access_token': accessToken,
        'refresh_token': refreshToken,
        'expires_in': expiresIn,
        'scope': spotifyScope,
        'error': error,
      }
    } = await axios.post<{
      'access_token'?: string,
      'refresh_token'?: string,
      'expires_in'?: string,
      'scope'?: string,
      'token_type'?: 'Bearer',
      'error'?: string,
      'state'?: string,
    }>('https://accounts.spotify.com/api/token', 
      qs.stringify({
        code,
        redirect_uri: `${process.env.HOST}/spotify-callback`,
        grant_type: 'authorization_code'
      }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
    });

    const htmlString = await new Promise((res, rej) => {
      ejs.renderFile(
        path.resolve(__dirname, './views/spotify-redirect.ejs'), {
          expiresIn: dateNow + +expiresIn * 1000,
          accessToken,
          refreshToken,
          error,
          spotifyScope,
        }, 
        (err, html) => {
          if (err) {
            rej(err);
          } else {
            res(html);
          }
        }
      );
    }); 

    res.send(htmlString);
  } catch (err) {
    res.sendStatus(401);
  }
});

app.get('/deezer-callback', async (req, res) => {
  const code: string | null = req.query.code || null;

  try {
    const {
      data: {access_token}
    } = await axios.get<{
      access_token: string,
    }>('https://connect.deezer.com/oauth/access_token.php?', {
      params: {
        app_id: process.env.DEEZER_CLIENT_ID,
        secret: process.env.DEEZER_CLIENT_SECRET,
        code,
        output: 'json'
      }
    });

    const htmlString = await new Promise((res, rej) => {
      ejs.renderFile(
        path.resolve(__dirname, './views/deezer-redirect.ejs'), {
          accessToken: access_token,
        }, 
        (err, html) => {
          if (err) {
            rej(err);
          } else {
            res(html);
          }
        }
      );
    }); 

    res.send(htmlString);
  } catch (err) {
    res.sendStatus(401);
  }
});

app.get('/refresh-token', async (req, res) => {
  const refreshToken = req.query.refresh_token;

  const dateNow = Date.now();

  try {
    const authToken = `Basic ${
      Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
    }`;
    
    const {
      data: {
        'access_token': accessToken,
        'expires_in': expiresIn,
      }
    } = await axios.post<{
      'access_token': string,
      'expires_in': string,
    }>('https://accounts.spotify.com/api/token', qs.stringify({
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken,
    }), {
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authToken,
      },
    });

    res.send({
      accessToken, 
      expiresIn: dateNow + +expiresIn * 1000,
    });
  } catch (err) {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log(`Running on ${port}`)
});
