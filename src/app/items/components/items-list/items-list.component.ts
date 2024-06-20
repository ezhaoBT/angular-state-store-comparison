import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { Item } from '../../interfaces';
import { LoadingMaskComponent } from '../loading-mask/loading-mask.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [MatListModule, LoadingMaskComponent, CommonModule, MatButtonModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent {
  @Input() public data: Item[] = [];
  @Input() public isLoading: boolean = false;
  @Input() public selectedId = '';
  @Output() public selectionChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public refresh: EventEmitter<void> = new EventEmitter<void>();

  public handleSelectionChange(e: MatSelectionListChange): void {
    this.selectionChange.emit(e.options[0].value);
  }
}
