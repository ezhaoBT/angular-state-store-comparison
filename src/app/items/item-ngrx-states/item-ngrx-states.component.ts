import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Item } from '../interfaces';
import * as itemsSelectors from '../ngrx-store/ngrx.items.selectors';
import * as itemsActions from '../ngrx-store/ngrx.items.actions';
import { ItemsListComponent } from '../components/items-list/items-list.component';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from '../components/item-form/item-form.component';
@Component({
  selector: 'app-item-ngrx-states',
  standalone: true,
  imports: [ItemsListComponent, CommonModule, ItemFormComponent],
  templateUrl: './item-ngrx-states.component.html',
  styleUrl: './item-ngrx-states.component.scss',
})
export class ItemNgrxStatesComponent implements OnInit {
  public itemsData$!: Observable<Item[]>;
  public itemsIsLoading$!: Observable<boolean>;

  public selectedItemData$!: Observable<Item>;
  public selectedItemId$!: Observable<string>;
  public selectedItemIsLoading$!: Observable<boolean>;

  public checkedBananaCount$!: Observable<number>;
  public anyNerds$!: Observable<boolean>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.loadItems();
    this.itemsData$ = this.store.select(itemsSelectors.selectItemsListData);
    this.itemsIsLoading$ = this.store.select(itemsSelectors.selectItemsListIsLoading);
    this.selectedItemData$ = this.store.select(itemsSelectors.selectItemsSelectedItemData);
    this.selectedItemId$ = this.store.select(itemsSelectors.selectItemsSelectedItemDataId);
    this.selectedItemIsLoading$ = this.store.select(itemsSelectors.selectItemsSelectedItemIsLoading);
    this.checkedBananaCount$ = this.store.select(itemsSelectors.selectItemsListDataCheckedBananaCount);
    this.anyNerds$ = this.store.select(itemsSelectors.selectItemsListDataAnyNerds);
  }

  public loadItems(): void {
    this.store.dispatch(itemsActions.GET_ITEMS());
  }

  public loadItemById(id: string): void {
    this.store.dispatch(itemsActions.GET_ITEM_BY_ID({ id }));
  }

  public saveItem(item: Item): void {
    this.store.dispatch(itemsActions.SAVE_ITEM({ item }));
  }
}
