import React, {FC, ReactNode} from 'react';
import classNames from 'classnames/bind';
import {Popup} from '../../popup';

import styles from './closing-popup.scss';

const cx = classNames.bind(styles);

export interface ClosingPopupProps {
  onClose: () => void;
  isBlocking?: boolean;
  title: ReactNode;
  className?: string;
  contentClassName?: string;
}

const ClosingPopupComponent: FC<ClosingPopupProps> = ({
  title,
  onClose,
  isBlocking,
  children,
  className,
  contentClassName,
}) => {
  return (
    <Popup>
      <div className={cx('background', {'blocking': isBlocking})} onClick={!isBlocking ? onClose : undefined}>
        <div className={cx('container', className)}>
          <div className={cx('header')}>
            {title}
            <button className={cx('close-btn')} onClick={onClose}>X</button>
          </div>
          <div className={cx('content', contentClassName)}>
            {children}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export {ClosingPopupComponent};

