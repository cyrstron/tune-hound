import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { SearchSource, SpotifySearchItem, DeezerSearchItem } from '@app/state/search/types';
import {DeezerDetails} from './components/deezer-details';
import {SpotifyDetails} from './components/spotify-details';
import deezerLogo from '@app/resources/source-logos/deezer-logo.svg';
import spotifyLogo from '@app/resources/source-logos/spotify-logo.svg';

import styles from './source-details.scss';

const cx = classNames.bind(styles);

export interface SourceDetailsProps {
  spotify?: SpotifySearchItem | null;
  deezer?: DeezerSearchItem | null;
  className?: string;
}

const SourceDetailsComponent: FC<SourceDetailsProps> = ({
  spotify, 
  deezer, 
  className,
}) => {
  const [source, setSource] = useState<SearchSource | undefined>();

  const onDeezerClick = useCallback(() => {
    setSource(source !== 'deezer' ? 'deezer' : undefined);
  }, [setSource, source]);

  const onSpotifyClick = useCallback(() => {
    setSource(source !== 'spotify' ? 'spotify' : undefined);
  }, [setSource, source]);

  return (
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
          <DeezerDetails object={deezer} />
        )}
        {source === 'spotify' && spotify && (
          <SpotifyDetails object={spotify} />
        )}
      </div>
    </div>
  );
}

export {SourceDetailsComponent};
