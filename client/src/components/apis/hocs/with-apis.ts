import {ComponentType} from 'react';
import { ApisCtx } from '../';
import { withDeezer, DeezerCtx } from '../components/deezer';
import { withSpotify } from '../components/spotify';

const withApis = <Props>(Component: ComponentType<Props & ApisCtx>): ComponentType<Props> => {
  const WithSpotify = withSpotify<Props & DeezerCtx>(Component);
  const WithDeezer = withDeezer<Props>(WithSpotify);

  return WithDeezer;
}

export {withApis}