import {createContext} from 'react';

const PopupCtx = createContext<HTMLDivElement | undefined>(undefined);

export const PopupCtxProvider = PopupCtx.Provider;
export const PopupCtxConsumer = PopupCtx.Consumer;

export {PopupProvider} from './popup-provider';
