export const deezerConfig = {
  initConfig: {
    appId: process.env.DEEZER_PLAYER_ID!,
    channelUrl: `${process.env.HOST}/deezer-channel`,
  },
  connectionTimeout: 5000,
};

export const spotifyConfig = {};
