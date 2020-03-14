import React, {FC} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames/bind';
import {TooltipCtxConsumer} from './components/tooltip-provider';

import styles from './tooltip.scss';

const cx = classNames.bind(styles);

export interface TooltipProps {
  className?: string;
  top: number;
  left: number;
}

const Tooltip: FC<TooltipProps> = ({children, className, top, left}) => (
  <TooltipCtxConsumer>
    {(container) => container && createPortal((
      <div 
        className={cx('tooltip', className)}
        style={{
          top,
          left,
        }}
      >
        {children}
      </div>
    ), container)}
  </TooltipCtxConsumer>
);

export {Tooltip}
