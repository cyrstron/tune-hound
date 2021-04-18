export const APP_ROOT = '@app';

export const INIT_APP = `${APP_ROOT}/INIT` as const;

export const SPAWN_DYNAMIC_SAGA = `${APP_ROOT}/SPAWN_DYNAMIC_SAGA` as const;
export const CANCEL_DYNAMIC_SAGA = `${APP_ROOT}/CANCEL_DYNAMIC_SAGA` as const;

export const ADD_DYNAMIC_REDUCER = `${APP_ROOT}/ADD_DYNAMIC_REDUCER` as const;
export const REMOVE_DYNAMIC_REDUCER = `${APP_ROOT}/REMOVE_DYNAMIC_REDUCER` as const;
