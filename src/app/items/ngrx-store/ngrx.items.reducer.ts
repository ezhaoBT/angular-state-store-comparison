import { createReducer, on } from '@ngrx/store';
import { ItemFruit, ItemsState } from '../interfaces';
import * as itemActions from './ngrx.items.actions';

export const ITEMS_STORE_NAME = 'items';

const initialState: ItemsState = {
  list: {
    data: [],
    isLoading: false,
  },
  selectedItem: {
    data: {
      id: '',
      name: '',
      fruit: '' as ItemFruit,
      flag: false,
    },
    isLoading: false,
  },
};

export const ItemReducer = createReducer(
  initialState,
  on(
    itemActions.GET_ITEMS,
    (state): ItemsState => ({
      ...state,
      list: {
        ...state.list,
        data: [...state.list.data],
        isLoading: true,
      },
    }),
  ),
  on(
    itemActions.GET_ITEMS_SUCCESS,
    (state, { data }): ItemsState => ({
      ...state,
      list: {
        ...state.list,
        data,
        isLoading: false,
      },
    }),
  ),
  on(
    itemActions.GET_ITEMS_FAILURE,
    (state): ItemsState => ({
      ...state,
      list: {
        ...state.list,
        data: [],
        isLoading: false,
      },
    }),
  ),
  on(
    itemActions.GET_ITEM_BY_ID,
    (state): ItemsState => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        data: { ...initialState.selectedItem.data },
        isLoading: true,
      },
    }),
  ),
  on(
    itemActions.GET_ITEM_BY_ID_SUCCESS,
    (state, { data }): ItemsState => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        data,
        isLoading: false,
      },
    }),
  ),
  on(
    itemActions.GET_ITEM_BY_ID_FAILURE,
    (state): ItemsState => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        data: { ...initialState.selectedItem.data },
        isLoading: false,
      },
    }),
  ),
  on(
    itemActions.SAVE_ITEM,
    (state): ItemsState => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        data: { ...initialState.selectedItem.data },
        isLoading: true,
      },
    }),
  ),
  on(
    itemActions.SAVE_ITEM_SUCCESS,
    (state, { data }): ItemsState => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        data,
        isLoading: false,
      },
    }),
  ),
  on(
    itemActions.SAVE_ITEM_FAILURE,
    (state): ItemsState => ({
      ...state,
      selectedItem: {
        ...state.selectedItem,
        data: { ...initialState.selectedItem.data },
        isLoading: false,
      },
    }),
  ),
);
