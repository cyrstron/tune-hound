import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { SearchSource, SpotifySearchItem, DeezerSearchItem } from '@app/state/search/types';
import {DeezerItem, SpotifyItem} from '@app/components/source-items';
import deezerLogo from '@app/resources/source-logos/deezer-logo.svg';
import spotifyLogo from '@app/resources/source-logos/spotify-logo.svg';

import styles from './source-details.scss';
import { extendSearchResult } from '@app/state/search';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/state';
import { selectItemsForExtensionById } from '@app/state/search/selectors';
import { ExtensionPopup } from './components/extension-popup';

const cx = classNames.bind(styles);

export interface SourceDetailsProps {
  id: string;
  spotify?: SpotifySearchItem | null;
  deezer?: DeezerSearchItem | null;
  className?: string;
}

const SourceDetailsComponent: FC<SourceDetailsProps> = ({
  id,
  spotify, 
  deezer, 
  className,
}) => {
  const [source, setSource] = useState<SearchSource | undefined>();

  const dispatch = useDispatch();
  const {
    spotify: spotifyExtensions, 
    deezer: deezerExtensions,
  } = useSelector((state: AppState) => selectItemsForExtensionById(state, id))

  const onDeezerClick = useCallback(() => {
    setSource(source !== 'deezer' ? 'deezer' : undefined);

    if (deezer !== undefined) return;

    const action = extendSearchResult(id, 'deezer');

    dispatch(action);
  }, [setSource, source, deezer, id, dispatch]);

  const onSpotifyClick = useCallback(() => {
    setSource(source !== 'spotify' ? 'spotify' : undefined);

    if (spotify === null || (spotify && 'isFull' in spotify)) return;

    const action = extendSearchResult(id, 'spotify');

    dispatch(action);
  }, [setSource, source, spotify, id, dispatch]);

  return (
    <>
      <div className={cx('details', className)}>
        <div className={cx('controls')}>
          <button onClick={onDeezerClick}>
            <img 
              className={cx('control-icon')} 
              src={deezerLogo} 
              alt="Deezer" 
            />
          </button>
          <button onClick={onSpotifyClick}>
            <img           
              className={cx('control-icon')} 
              src={spotifyLogo} 
              alt="Spotify" 
            />
          </button>
        </div>
        <div className={cx('content')}>
          {source === 'deezer' && deezer && (
            <DeezerItem object={deezer}/>
          )}
          {source === 'spotify' && spotify && (
            <SpotifyItem object={spotify} />
          )}
          {((
              source === 'deezer' && deezer === null
            ) || (
              source === 'spotify' && spotify === null 
            )) && (
              'Not found in this source :C'
          )}
        </div>
      </div>
      <ExtensionPopup spotify={spotifyExtensions} deezer={deezerExtensions} id={id}/>
    </>
  );
}

export {SourceDetailsComponent};
