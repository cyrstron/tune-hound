import { INIT_APP } from "./consts";

export interface InitAppAction {
  type: typeof INIT_APP;
}

export const initApp = () => ({
  type: INIT_APP,
});