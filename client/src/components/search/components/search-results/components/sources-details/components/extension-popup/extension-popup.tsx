import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SpotifySearchItem, DeezerSearchItem } from '@app/state/search/types';
import { Popup } from '@app/components/popup';
import { SpotifyDetails } from '../spotify-details';
import { DeezerDetails } from '../deezer-details';

import styles from './extension-popup.scss';

const cx = classNames.bind(styles);

export interface ExtensionPopupProps {
  spotify?: SpotifySearchItem[];
  deezer?: DeezerSearchItem[];
}

const ExtensionPopupComponent: FC<ExtensionPopupProps> = ({spotify, deezer}) => {
  return (
    <>
      {spotify && (
        <Popup>
          <div className={cx('container')}>
            {spotify.map(item => (
              <SpotifyDetails object={item}/>
            ))}
          </div>
        </Popup>
      )}
      {deezer && (
        <Popup>
          <div className={cx('container')}>
            {deezer.map(item => (
              <DeezerDetails object={item}/>
            ))}
          </div>
        </Popup>
      )}
    </>
  );
}

export {ExtensionPopupComponent}
