import React, {FC} from 'react';
import classNames from 'classnames/bind';
import { SearchResult } from '@app/state/search/types';
import {SearchedTrack as SearchedTrackComponent} from '../searched-track';

import styles from './searched-item.scss';

const cx = classNames.bind(styles);

export interface SearchedTrackProps {
  item: SearchResult;
}

const SearchedItemComponent: FC<SearchedTrackProps> = ({item}) => {
  return (
    <li className={cx('item-container')}>
        {item.type === 'track' && (
          <SearchedTrackComponent track={item} className={cx('item')}/>
        )}
    </li>
  );
}

export {SearchedItemComponent};
