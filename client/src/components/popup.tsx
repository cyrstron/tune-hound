import React, {FC} from 'react';
import {createPortal} from 'react-dom';
import {PopupCtxConsumer} from './popup-provider';

const Popup: FC<{}> = ({children}) => (
  <PopupCtxConsumer>
    {(container) => container && createPortal(children, container)}
  </PopupCtxConsumer>
);

export {Popup}
