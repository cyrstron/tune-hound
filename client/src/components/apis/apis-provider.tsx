import React, { FC } from "react";
// import { DeezerProvider } from "./components/deezer";
import { SpotifyProvider } from "./components/spotify";

interface ApiProviderProps {
  deezerAppId: string,
  deezerChannelUrl: string,
}

const ApisProvider: FC<ApiProviderProps> = ({
  children,
  deezerAppId,
  deezerChannelUrl
}) => (
  // <DeezerProvider 
  //   appId={deezerAppId}
  //   channelUrl={deezerChannelUrl}
  // >
    <SpotifyProvider>
      {children}
    </SpotifyProvider>
  // </DeezerProvider>
);

export {ApisProvider}