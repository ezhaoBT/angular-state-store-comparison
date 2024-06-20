import { Component, OnInit, inject } from '@angular/core';
import { ItemsStore } from '../signals-store/signal.store';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from '../components/item-form/item-form.component';
import { ItemsListComponent } from '../components/items-list/items-list.component';

@Component({
  selector: 'app-item-signal-states',
  standalone: true,
  imports: [ItemsListComponent, CommonModule, ItemFormComponent],
  templateUrl: './item-signal-states.component.html',
  styleUrl: './item-signal-states.component.scss',
})
export class ItemSignalStatesComponent implements OnInit {
  public readonly store = inject(ItemsStore);

  public ngOnInit(): void {
    this.store.getItems();
  }
}
