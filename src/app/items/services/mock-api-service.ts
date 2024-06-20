import { Injectable } from '@angular/core';
import { Item, ItemFruit } from '../interfaces';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  private items: Item[] = [
    {
      id: '1',
      name: 'Definitely an apple',
      fruit: ItemFruit.Banana,
      flag: true,
    },
    {
      id: '2',
      name: 'Definitely a banana',
      fruit: ItemFruit.Apple,
      flag: true,
    },
    {
      id: '3',
      name: 'Actually a banana',
      fruit: ItemFruit.Banana,
      flag: false,
    },
    {
      id: '4',
      name: 'Yeet',
      fruit: ItemFruit.Cherry,
      flag: true,
    },
  ];

  public getItems(): Observable<Item[]> {
    return of(this.items).pipe(delay(1000));
  }

  public getItem(id: string): Observable<Item> {
    return of(this.items.find(i => i.id === id)!).pipe(delay(1000));
  }

  public postItem(newItem: Item): Observable<Item> {
    const items = [...this.items];
    newItem = { ...newItem };
    if (newItem.id) {
      const index = items.findIndex(i => i.id === newItem.id);
      index && items.splice(index, 1, newItem);
    } else {
      newItem.id = (this.items.length + 1).toString();
      items.push(newItem);
    }

    this.items = items;

    return of(newItem).pipe(delay(750));
  }
}
