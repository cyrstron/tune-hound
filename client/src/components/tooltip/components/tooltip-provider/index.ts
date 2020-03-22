import {createContext} from 'react';

const TooltipCtx = createContext<HTMLDivElement | undefined>(undefined);

export const TooltipCtxProvider = TooltipCtx.Provider;
export const TooltipCtxConsumer = TooltipCtx.Consumer;

export {TooltipProvider} from './tooltip-provider';
