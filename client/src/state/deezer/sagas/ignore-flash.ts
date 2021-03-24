import { take } from 'redux-saga/effects';
import { SetFlashIgnoredAction } from '../actions';
import { SET_FLASH_IGNORED } from '../consts';
import { setFlashIgnored } from '../services/helpers';

export function* ignoreFlash(): any {
  const {
    payload: { isIgnored },
  }: SetFlashIgnoredAction = yield take(SET_FLASH_IGNORED);

  setFlashIgnored(isIgnored);
}
