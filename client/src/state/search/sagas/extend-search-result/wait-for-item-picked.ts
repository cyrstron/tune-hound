import {take, race} from 'redux-saga/effects';
import { SearchItem, SearchSource } from '@app/state/search/types';
import { PickOptionForExtendAction, ResetOptionsForExtendAction } from '@app/state/search/actions';
import { PICK_OPTION_FOR_EXTEND, RESET_OPTIONS_FOR_EXTEND } from '@app/state/search/consts';

export function* waitForItemPicked(extendedId: string, extendedSource: SearchSource) {
  let picked: SearchItem | null | undefined | false;

  while(picked === undefined) {
    const result: {
      pick: PickOptionForExtendAction,
    } | {
      reset: ResetOptionsForExtendAction,
    } = yield race({
      pick: take(PICK_OPTION_FOR_EXTEND),
      reset: take(RESET_OPTIONS_FOR_EXTEND),
    });

    let action: PickOptionForExtendAction | ResetOptionsForExtendAction;

    if ('pick' in result) {
      action = result.pick;
    } else {
      action = result.reset;
    }

    const {itemId, source} = action.payload;

    if (itemId !== extendedId || source !== extendedSource) continue;
    
    if (action.type === PICK_OPTION_FOR_EXTEND) {
      picked = action.payload.pickedItem;
    } else {
      break;
    }
  }

  return picked;
}