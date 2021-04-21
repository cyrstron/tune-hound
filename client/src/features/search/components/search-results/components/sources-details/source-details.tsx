import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import deezerLogo from '@app/resources/source-logos/deezer-logo.svg';
import spotifyLogo from '@app/resources/source-logos/spotify-logo.svg';
import { useSelector } from 'react-redux';
import { ExtensionPopup } from './components/extension-popup';
import { SpotifyItemDetails } from './components/spotify-item-details';
import { DeezerItemDetails } from './components/deezer-item-details';

import styles from './source-details.scss';
import { selectDeezerIsConnected } from '@app/state/deezer';
import { selectIsSpotifyConnected } from '@app/state/spotify';
import {
  DeezerSourceItem,
  SearchSource,
  SpotifySourceItem,
} from '@app/features/search/state/types';
import { useDispatcher, useParamsSelector } from '@app/hooks';
import { selectAllExtensionItemsById } from '@app/features/search/state/selectors';
import { extendSearchResult } from '@app/features/search/state';

const cx = classNames.bind(styles);

export interface SourceDetailsProps {
  id: string;
  isCrossExtendable: boolean;
  spotify?: SpotifySourceItem | null;
  deezer?: DeezerSourceItem | null;
  className?: string;
}

const SourceDetailsComponent: FC<SourceDetailsProps> = ({
  id,
  spotify,
  deezer,
  className,
  isCrossExtendable,
}) => {
  const [source, setSource] = useState<SearchSource | undefined>();

  const dispatcher = useDispatcher();
  const extensions = useParamsSelector(selectAllExtensionItemsById, id);

  const { spotify: spotifyExtensions, deezer: deezerExtensions } = extensions;

  const isDeezerConnected = useSelector(selectDeezerIsConnected);
  const isSpotifyConnected = useSelector(selectIsSpotifyConnected);

  const hasDeezerDetails = isDeezerConnected && (isCrossExtendable || !!deezer);
  const hasSpotifyDetails = isSpotifyConnected && (isCrossExtendable || !!spotify);

  const onDeezerClick = useCallback(() => {
    setSource(source !== SearchSource.DEEZER ? SearchSource.DEEZER : undefined);

    if (deezer === null || (deezer && deezer.isFull)) return;

    dispatcher(extendSearchResult, id, SearchSource.DEEZER);
  }, [setSource, source, deezer, id, dispatcher]);

  const onSpotifyClick = useCallback(() => {
    setSource(source !== SearchSource.SPOTIFY ? SearchSource.SPOTIFY : undefined);

    if (spotify === null || (spotify && spotify.isFull)) return;

    dispatcher(extendSearchResult, id, SearchSource.SPOTIFY);
  }, [setSource, source, spotify, id, dispatcher]);

  return (
    <>
      <div className={cx('details', className)}>
        <div className={cx('controls')}>
          {hasDeezerDetails && (
            <button onClick={onDeezerClick}>
              <img className={cx('control-icon')} src={deezerLogo} alt="Deezer" />
            </button>
          )}
          {hasSpotifyDetails && (
            <button onClick={onSpotifyClick}>
              <img className={cx('control-icon')} src={spotifyLogo} alt="Spotify" />
            </button>
          )}
        </div>
        <div className={cx('content')}>
          {source === 'deezer' && deezer && deezer.isFull && (
            <DeezerItemDetails id={id} item={deezer} className={cx('item-details')} />
          )}
          {source === 'spotify' && spotify && spotify.isFull && (
            <SpotifyItemDetails id={id} item={spotify} className={cx('item-details')} />
          )}
          {((source === 'deezer' && deezer === null) ||
            (source === 'spotify' && spotify === null)) &&
            'Not found in this source :C'}
        </div>
      </div>
      <ExtensionPopup spotify={spotifyExtensions} deezer={deezerExtensions} id={id} />
    </>
  );
};

export { SourceDetailsComponent };
