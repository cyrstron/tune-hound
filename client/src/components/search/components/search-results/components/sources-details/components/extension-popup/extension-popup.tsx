import React, {FC, useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames/bind';
import { SpotifySearchItem, DeezerSearchItem, SearchItem, SearchSource } from '@app/state/search/types';
import { pickOptionForExtend, resetOptionsForExtend } from '@app/state/search';
import { ClosingPopup } from '@app/components/popup';
import { ExtensionItem }from './components/extension-item';

import styles from './extension-popup.scss';

const cx = classNames.bind(styles);

export interface ExtensionPopupProps {
  id: string;
  spotify?: SpotifySearchItem[];
  deezer?: DeezerSearchItem[];
}

const ExtensionPopupComponent: FC<ExtensionPopupProps> = ({spotify, deezer, id}) => {
  const dispatch = useDispatch();

  const [selectedItem, setSelected] = useState<SearchItem | undefined>();

  let source: SearchSource | undefined;

  if (spotify) {
    source = 'spotify';
  } else if (deezer) {
    source = 'deezer';
  }

  const onClick = useCallback((item: SearchItem) => {
    setSelected(item);
  }, [setSelected]);

  const onApply = useCallback(() => {
    if (!selectedItem || !source) return;

    const action = pickOptionForExtend(id, source, selectedItem);

    dispatch(action);
  }, [selectedItem, source, id, dispatch]);

  const onNotFound = useCallback(() => {
    if (!source) return;

    const action = pickOptionForExtend(id, source, null);

    dispatch(action);
  }, [source, id, dispatch]);

  const onCancel = useCallback(() => {
    if (!source) return;

    const action = resetOptionsForExtend(id, source);

    dispatch(action);
  }, [source, id, dispatch]);

  let propItems: Array<{
    spotify?: SpotifySearchItem;
    deezer?: DeezerSearchItem;
    isSelected: boolean;
  }> | undefined;

  if (spotify) {
    propItems = spotify.map((item) => ({spotify: item, isSelected: item.id === selectedItem?.id}));
  } else if (deezer) {
    propItems = deezer.map((item) => ({deezer: item,  isSelected: item.id === selectedItem?.id}));
  }

  if (!propItems) return null;

  return (
    <ClosingPopup title="Choose the similar item" onClose={onCancel} isBlocking>
      <ul className={cx('items-list')}>
        {propItems.map((props) => (
          <ExtensionItem {...props} onClick={onClick} key={props.deezer?.id || props.spotify?.id} />
        ))}
      </ul>
      <div>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onNotFound}>Not found</button>
        <button onClick={onApply}>Apply</button>
      </div>
    </ClosingPopup>
  );
}

export {ExtensionPopupComponent}
