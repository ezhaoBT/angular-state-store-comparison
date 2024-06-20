import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as itemsActions from './ngrx.items.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { MockApiService } from '../services/mock-api-service';
import { ItemsStore } from '../signals-store/signal.store';

@Injectable()
export class ItemsEffects {
  public readonly store = inject(ItemsStore);

  constructor(
    private actions$: Actions,
    private apiService: MockApiService,
  ) {}

  public getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemsActions.GET_ITEMS),
      switchMap(() =>
        this.apiService.getItems().pipe(
          map(data => itemsActions.GET_ITEMS_SUCCESS({ data })),
          catchError(err => of(itemsActions.GET_ITEMS_FAILURE())),
        ),
      ),
    ),
  );

  public getItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemsActions.GET_ITEM_BY_ID),
      switchMap(({ id }) =>
        this.apiService.getItem(id).pipe(
          map(data => itemsActions.GET_ITEM_BY_ID_SUCCESS({ data })),
          catchError(err => of(itemsActions.GET_ITEM_BY_ID_FAILURE())),
        ),
      ),
    ),
  );

  public saveItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemsActions.SAVE_ITEM),
      switchMap(({ item }) =>
        this.apiService.postItem(item).pipe(
          map(data => itemsActions.SAVE_ITEM_SUCCESS({ data })),
          catchError(err => of(itemsActions.SAVE_ITEM_FAILURE())),
        ),
      ),
    ),
  );

  public updateItemsOnSuccessfulSave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(itemsActions.SAVE_ITEM_SUCCESS),
      map(() => itemsActions.GET_ITEMS()),
    ),
  );

  // Cross store update
  public updateSignalStoreItemsOnSuccessfulSave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(itemsActions.SAVE_ITEM_SUCCESS),
        tap(() => this.store.getItems()),
      ),
    { dispatch: false },
  );
}
