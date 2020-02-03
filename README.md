# tune-hound

## Deezer connection development setup

**Deezer SDK works properly only on `127.0.0.1`. Do not use `localhost`!**

1. Sign up and login to [Deezer Dev Console](https://developers.deezer.com)
2. [Create new app](https://developers.deezer.com/myapps)
3. Set application domain to `http://127.0.0.1:3000`
4. Set redirect URI to `http://127.0.0.1:3000/deezer-callback`
5. Copy Application ID & Secret Key from the app info tab
6. Add them to root `.env` file as `DEEZER_PLAYER_ID` and `DEEZER_PLAYER_SECRET`
7. **Switch on Flash support in your browser to stream Deezer audio files in the app**
