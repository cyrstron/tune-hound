import React, { FC, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import {
  SpotifySourceItemShort,
  DeezerSourceItemShort,
  SourceItemShort,
  SearchSource,
} from '@app/features/search/state/types';
import { selectExtensionCanFetchByIdAndSource } from '@app/features/search/state/selectors';
import { ClosingPopup } from '@app/components/popup';
import { ExtensionItem } from './components/extension-item';
import { useDispatcher, useParamsSelector } from '@app/hooks';

import styles from './extension-popup.scss';
import {
  fetchNextOptionsForExtend,
  pickOptionForExtend,
  resetOptionsForExtend,
} from '@app/features/search/state';

const cx = classNames.bind(styles);

export interface ExtensionPopupProps {
  id: string;
  spotify?: SpotifySourceItemShort[];
  deezer?: DeezerSourceItemShort[];
}

const ExtensionPopupComponent: FC<ExtensionPopupProps> = ({ spotify, deezer, id }) => {
  const dispatcher = useDispatcher();

  const [selectedItem, setSelected] = useState<SourceItemShort | undefined>();

  let source: SearchSource | undefined;

  if (spotify) {
    source = SearchSource.SPOTIFY;
  } else if (deezer) {
    source = SearchSource.DEEZER;
  }

  const hasToLoadMore = useParamsSelector(selectExtensionCanFetchByIdAndSource, id, source);

  const onClick = useCallback(
    (item: SourceItemShort) => {
      setSelected(item);
    },
    [setSelected],
  );

  const onApply = useCallback(() => {
    if (!selectedItem || !source) return;

    dispatcher(pickOptionForExtend, id, source, selectedItem);
  }, [selectedItem, source, id, dispatcher]);

  const onNotFound = useCallback(() => {
    if (!source) return;

    dispatcher(pickOptionForExtend, id, source, null);
  }, [source, id, dispatcher]);

  const onCancel = useCallback(() => {
    if (!source) return;

    dispatcher(resetOptionsForExtend, id, source);
  }, [source, id, dispatcher]);

  const onLoadMore = useCallback(() => {
    if (!source) return;

    dispatcher(fetchNextOptionsForExtend, id, source);
  }, [source, id, dispatcher]);

  let propItems:
    | Array<{
        spotify?: SpotifySourceItemShort;
        deezer?: DeezerSourceItemShort;
        isSelected: boolean;
      }>
    | undefined;

  if (spotify) {
    propItems = spotify.map(item => ({
      spotify: item,
      isSelected: item.id === selectedItem?.id,
    }));
  } else if (deezer) {
    propItems = deezer.map(item => ({
      deezer: item,
      isSelected: item.id === selectedItem?.id,
    }));
  }

  if (!propItems || propItems.length <= 1) return null;

  return (
    <ClosingPopup title="Choose the similar item" onClose={onCancel} isBlocking>
      <div className={cx('content')}>
        <ul className={cx('items-list')}>
          {propItems.map(props => (
            <ExtensionItem
              {...props}
              onClick={onClick}
              key={props.deezer?.id || props.spotify?.id}
            />
          ))}
        </ul>
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onNotFound}>Not found</button>
          <button onClick={onApply}>Apply</button>
          <button onClick={onLoadMore} disabled={!hasToLoadMore}>
            Load More
          </button>
        </div>
      </div>
    </ClosingPopup>
  );
};

export { ExtensionPopupComponent };
