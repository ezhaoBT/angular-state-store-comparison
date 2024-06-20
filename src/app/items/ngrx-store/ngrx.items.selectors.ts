import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemFruit, ItemsState } from '../interfaces';

const selectItems = createFeatureSelector<ItemsState>('items');

export const selectItemsList = createSelector(selectItems, state => state.list);
export const selectItemsListData = createSelector(selectItemsList, state => state.data);
export const selectItemsListIsLoading = createSelector(selectItemsList, state => state.isLoading);

export const selectItemsListDataCheckedBananaCount = createSelector(
  selectItemsListData,
  state => state.filter(i => i.fruit === ItemFruit.Banana && i.flag).length,
);
export const selectItemsListDataAnyNerds = createSelector(
  selectItemsListData,
  state => !!state.find(i => i.name.toLowerCase().includes('nerd')),
);

export const selectItemsSelectedItem = createSelector(selectItems, state => state.selectedItem);
export const selectItemsSelectedItemData = createSelector(selectItemsSelectedItem, state => state.data);
export const selectItemsSelectedItemIsLoading = createSelector(selectItemsSelectedItem, state => state.isLoading);

export const selectItemsSelectedItemDataId = createSelector(selectItemsSelectedItemData, state => state.id);
