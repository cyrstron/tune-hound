import React from 'react';
import { SpotifyCtxConsumer, SpotifyCtx } from ".."
import { ComponentType } from "react";

const withSpotify = <Props extends {}>(Component: ComponentType<Props & SpotifyCtx>) => {
  const WithSpotify = (props: Props) => {
    return (
      <SpotifyCtxConsumer>
        {(value) => value && (
          <Component 
            {...props} 
            {...value}
          />
        )}
      </SpotifyCtxConsumer>
    );
  }

  return WithSpotify;
}

export {withSpotify}