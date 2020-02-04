import React, { FC } from "react";
import { DeezerProvider } from "./components/deezer";
import { SpotifyProvider } from "./components/spotify";

const ApisProvider: FC<{}> = ({children}) => (
  <DeezerProvider>
    <SpotifyProvider>
      {children}
    </SpotifyProvider>
  </DeezerProvider>
);

export {ApisProvider}