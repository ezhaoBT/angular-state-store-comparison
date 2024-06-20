import { Component } from '@angular/core';
import { ItemNgrxStatesComponent } from './item-ngrx-states/item-ngrx-states.component';
import { ItemSignalStatesComponent } from './item-signal-states/item-signal-states.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemNgrxStatesComponent, ItemSignalStatesComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent {}
