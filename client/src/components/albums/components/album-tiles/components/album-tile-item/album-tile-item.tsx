import React, {FC} from 'react';
import classNames from 'classnames/bind';
import {AlbumTileProps} from '../../../album-tile/album-tile';
import {AlbumTile} from '../../../album-tile';

import styles from './album-tile-item.scss';

const cx = classNames.bind(styles);

export interface AlbumTileItemProps extends AlbumTileProps {
  id: string | number;
}

const AlbumTileItemComponent: FC<AlbumTileItemProps> = ({
  className,
  ...props
}) => {
  return (
    <li className={cx('album-item', className)}>
      <AlbumTile className={cx('tile')} {...props} />
    </li>
  );
};

export {AlbumTileItemComponent};
