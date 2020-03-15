import React, {FC} from 'react';
import {createPortal} from 'react-dom';
import {TooltipCtxConsumer} from './components/tooltip-provider';
import {TooltipContainer} from './components/tooltip-container';

export interface TooltipProps {
  className?: string;
  parent: HTMLElement;
}

const Tooltip: FC<TooltipProps> = ({children, className, parent}) => {
  return (
    <TooltipCtxConsumer>
      {(container) => container && createPortal((
        <TooltipContainer parent={parent} className={className}>
          {children}
        </TooltipContainer>
      ), container)}
    </TooltipCtxConsumer>
  );
};

export {Tooltip}
