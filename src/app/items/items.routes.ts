import { Routes } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ITEMS_STORE_NAME, ItemReducer } from './ngrx-store/ngrx.items.reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ItemsEffects } from './ngrx-store/ngrx.items.effects';

export const ITEM_ROUTES: Routes = [
  {
    path: '',
    component: ItemsComponent,
    providers: [provideState(ITEMS_STORE_NAME, ItemReducer), provideEffects([ItemsEffects])],
  },
];
