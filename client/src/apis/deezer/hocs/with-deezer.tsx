import React from 'react';
import { DeezerCtxConsumer, DeezerCtx } from ".."
import { ComponentType } from "react";

const withDeezer = <Props extends {}>(Component: ComponentType<Props & DeezerCtx>) => {
  const WithDeezer = (props: Props) => {
    return (
      <DeezerCtxConsumer>
        {(value) => value && (
          <Component 
            {...props} 
            {...value}
          />
        )}
      </DeezerCtxConsumer>
    );
  }

  return WithDeezer;
}

export {withDeezer}