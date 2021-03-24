import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { Player } from '../player/player';

import styles from './footer.scss';

const cx = classNames.bind(styles);

export interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <div className={cx('footer', className)}>
      <Player />
    </div>
  );
};

export { Footer };
