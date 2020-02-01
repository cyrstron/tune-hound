import express from 'express';
import axios from 'axios';
import path from 'path';
import qs from 'querystring';

import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

const app = express();
const port = process.env.PORT || 3001;

app.get('/login', (_req, res) => {
  var scope = 'user-read-private user-read-email';

  res.redirect(`https://accounts.spotify.com/authorize?${
    qs.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope,
      redirect_uri: 'http://localhost:3000/spotify-callback',
    })
  }`);
});

app.get('/spotify-callback', async (req, res) => {
  const code: string | null = req.query.code || null;

  try {
    const {
      data: {access_token, refresh_token}
    } = await axios.post<{
      access_token: string,
      refresh_token: string,
    }>('https://accounts.spotify.com/api/token', 
    qs.stringify({
      code,
      redirect_uri: 'http://localhost:3000/spotify-callback',
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
    });

    res.cookie('spotify_access_token', access_token);
    res.cookie('spotify_refresh_token', refresh_token);

    res.redirect('/');
  } catch (err) {
    res.sendStatus(401);
  }
});

app.get('/refresh-token', async (req, res) => {
  const refresh_token = req.query.refresh_token;

  try {
    const {
      data: {access_token}
    } = await axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'refresh_token',
      refresh_token,
    }, {
      headers: { 
        'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
    });

    res.send({
      'access_token': access_token
    });
  } catch (err) {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log(`Running on ${port}`)
});
