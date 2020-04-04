import React, {FC, ReactNode} from 'react';
import classNames from 'classnames/bind';
import { SpotifySearchItem, DeezerSearchItem } from '@app/state/search/types';
import { ClosingPopup } from '@app/components/popup';
import { SpotifyItem, DeezerItem } from '@app/components/source-items';

import styles from './extension-popup.scss';

const cx = classNames.bind(styles);

export interface ExtensionPopupProps {
  spotify?: SpotifySearchItem[];
  deezer?: DeezerSearchItem[];
}

const ExtensionPopupComponent: FC<ExtensionPopupProps> = ({spotify, deezer}) => {
  let items: ReactNode[] | undefined;

  if (spotify) {
    items = spotify.map(item => (
      <SpotifyItem key={item.id} object={item}/>
    ));
  } else if (deezer) {
    items = deezer.map(item => (
      <DeezerItem key={item.id} object={item}/>
    ));
  }

  if (!items) return null;

  return (
    <ClosingPopup title="Choose the similar item" onClose={() => {}} isBlocking>
      {items}
    </ClosingPopup>
  );
}

export {ExtensionPopupComponent}
