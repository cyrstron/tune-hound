import React, {FC, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames/bind';
import { 
  SpotifySourceItemShort, 
  DeezerSourceItemShort, 
  SourceItemShort, 
  SearchSource,
} from '@app/state/search/types';
import { pickOptionForExtend, resetOptionsForExtend, fetchNextOptionsForExtend } from '@app/state/search';
import { selectExtensionHasMoreItemsToFetch } from '@app/state/search/selectors';
import { ClosingPopup } from '@app/components/popup';
import { ExtensionItem }from './components/extension-item';

import styles from './extension-popup.scss';
import { AppState } from '@app/state';

const cx = classNames.bind(styles);

export interface ExtensionPopupProps {
  id: string;
  spotify?: SpotifySourceItemShort[];
  deezer?: DeezerSourceItemShort[];
}

const ExtensionPopupComponent: FC<ExtensionPopupProps> = ({spotify, deezer, id}) => {
  const dispatch = useDispatch();

  const [selectedItem, setSelected] = useState<SourceItemShort | undefined>();

  let source: SearchSource | undefined;

  if (spotify) {
    source = 'spotify';
  } else if (deezer) {
    source = 'deezer';
  }

  const hasToLoadMore = useSelector<AppState>((state) => !!source && selectExtensionHasMoreItemsToFetch(state, id, source))

  const onClick = useCallback((item: SourceItemShort) => {
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

  const onLoadMore = useCallback(() => {
    if (!source) return;

    const action = fetchNextOptionsForExtend(id, source);

    dispatch(action);
  }, [source, id, dispatch]);

  let propItems: Array<{
    spotify?: SpotifySourceItemShort;
    deezer?: DeezerSourceItemShort;
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
      <div className={cx('content')}>
        <ul className={cx('items-list')}>
          {propItems.map((props) => (
            <ExtensionItem {...props} onClick={onClick} key={props.deezer?.id || props.spotify?.id} />
          ))}
        </ul>
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onNotFound}>Not found</button>
          <button onClick={onApply}>Apply</button>
          <button onClick={onLoadMore} disabled={!hasToLoadMore}>Load More</button>
        </div>
      </div>
    </ClosingPopup>
  );
}

export {ExtensionPopupComponent}
