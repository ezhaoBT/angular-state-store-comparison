import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Item, ItemFruit, ItemsState } from '../interfaces';
import { MockApiService } from '../services/mock-api-service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import * as itemsActions from '../ngrx-store/ngrx.items.actions';

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

export const ItemsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ list, selectedItem }) => ({
    checkedBananaCount: computed(() => list.data().filter(i => i.fruit === ItemFruit.Banana && i.flag).length),
    anyNerds: computed(() => !!list.data().find(i => i.name.toLowerCase().includes('nerd'))),
  })),

  withMethods((store, apiService = inject(MockApiService), ngrxStore = inject(Store)) => {
    const getItems = rxMethod<void>(
      pipe(
        tap(() => patchState(store, state => ({ list: { ...state.list, isLoading: true } }))),
        switchMap(() =>
          apiService.getItems().pipe(
            tapResponse({
              next: data => patchState(store, state => ({ list: { ...state.list, data } })),
              error: console.error,
              finalize: () => patchState(store, state => ({ list: { ...state.list, isLoading: false } })),
            }),
          ),
        ),
      ),
    );
    const getItem = rxMethod<string>(
      pipe(
        tap(() => patchState(store, state => ({ selectedItem: { ...state.selectedItem, isLoading: true } }))),
        switchMap(id =>
          apiService.getItem(id).pipe(
            tapResponse({
              next: data => patchState(store, state => ({ selectedItem: { ...state.selectedItem, data } })),
              error: console.error,
              finalize: () =>
                patchState(store, state => ({ selectedItem: { ...state.selectedItem, isLoading: false } })),
            }),
          ),
        ),
      ),
    );
    const saveItem = rxMethod<Item>(
      pipe(
        tap(() => patchState(store, state => ({ selectedItem: { ...state.selectedItem, isLoading: true } }))),
        switchMap(item =>
          apiService.postItem(item).pipe(
            tapResponse({
              next: data => patchState(store, state => ({ selectedItem: { ...state.selectedItem, data } })),
              error: console.error,
              finalize: () => {
                patchState(store, state => ({ selectedItem: { ...state.selectedItem, isLoading: false } }));
                getItems();
                ngrxStore.dispatch(itemsActions.GET_ITEMS()); // Cross store update
              },
            }),
          ),
        ),
      ),
    );

    return { getItems, getItem, saveItem };
  }),
);
