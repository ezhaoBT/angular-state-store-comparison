import { createAction, props } from '@ngrx/store';
import { Item } from '../interfaces';

const key = '[ITEMS]';

export const GET_ITEMS = createAction(`${key} Get items`);
export const GET_ITEMS_SUCCESS = createAction(`${key} Get items success`, props<{ data: Item[] }>());
export const GET_ITEMS_FAILURE = createAction(`${key} Get items failure`);

export const GET_ITEM_BY_ID = createAction(`${key} Get item`, props<{ id: string }>());
export const GET_ITEM_BY_ID_SUCCESS = createAction(`${key} Get item by id success`, props<{ data: Item }>());
export const GET_ITEM_BY_ID_FAILURE = createAction(`${key} Get item by id failure`);

export const SAVE_ITEM = createAction(`${key} Save item`, props<{ item: Item }>());
export const SAVE_ITEM_SUCCESS = createAction(`${key} Save item success`, props<{ data: Item }>());
export const SAVE_ITEM_FAILURE = createAction(`${key} Save item failure`);
