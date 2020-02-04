# tune-hound

## Spotify connection development setup

1. Sigh up for Spotify
2. Login to [Spotify Dev Console](https://developer.spotify.com/dashboard/)
3. [Create new app](https://developer.spotify.com/dashboard/applications)
4. Set redirect URI to `http://127.0.0.1:3000/spotify-callback`
5. Copy **Client ID** & **Client Secret** from the app info panel
6. Add them to root `.env` file as `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`
7. Connect Spotify to the application
8. Go to your [Spotify App Player](https://open.spotify.com/) and click desktop icon near volume Control
8. Choose `Tune Hound Preview Player`

*It is recommended to disable your ad blocker to avoid multiple error messages in your console*

## Deezer connection development setup

1. Sign up for Deezer
2. Login to [Deezer Dev Console](https://developers.deezer.com)
3. [Create new app](https://developers.deezer.com/myapps)
4. Set application domain to `http://127.0.0.1:3000`
5. Set redirect URI to `http://127.0.0.1:3000/deezer-channel`
6. Copy **Application ID** & **Secret Key** from the app info tab
7. Add them to root `.env` file as `DEEZER_PLAYER_ID` and `DEEZER_PLAYER_SECRET`
8. **Enable Flash support in your browser to stream Deezer audio files in the app**

**Deezer SDK works properly only on `127.0.0.1`. Do not use `localhost`!**
