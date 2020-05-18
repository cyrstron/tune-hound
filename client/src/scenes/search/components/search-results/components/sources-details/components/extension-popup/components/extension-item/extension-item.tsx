import React, {FC, ReactNode, useCallback} from 'react';
import classNames from 'classnames/bind';
import {SpotifySourceItemShort, DeezerSourceItemShort, SourceItemShort} from '@app/state/search/types';
import {SpotifyItem, DeezerItem} from '@app/components/source-items';

import styles from './extension-item.scss';

const cx = classNames.bind(styles);

export interface ExtensionItemProps {
  spotify?: SpotifySourceItemShort;
  deezer?: DeezerSourceItemShort;
  onClick: (item: SourceItemShort) => void;
  isSelected: boolean;
  className?: string;
}

const ExtensionItemComponent: FC<ExtensionItemProps> = ({
  spotify,
  deezer,
  onClick,
  className,
  isSelected,
}) => {
  let item: ReactNode;

  const onItemClick = useCallback(() => {
    const item = spotify || deezer;

    if (!item) return;

    onClick(item);
  }, [onClick, spotify, deezer]);

  if (spotify) {
    item = (
      <SpotifyItem object={spotify}/>
    );
  } else if (deezer) {
    item = (
      <DeezerItem object={deezer}/>
    );
  }

  if (!item) return null;

  return (
    <li className={cx('item', className, {selected: isSelected})} onClick={onItemClick}>
      {item}
    </li>
  );
};

export {ExtensionItemComponent};
