import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Item, ItemFruit } from '../../interfaces';
import { LoadingMaskComponent } from '../loading-mask/loading-mask.component';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    LoadingMaskComponent,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormComponent implements OnChanges {
  @Input() public data: Item = {
    id: '',
    name: '',
    fruit: '' as ItemFruit,
    flag: false,
  };
  @Input() public isLoading: boolean = false;
  @Output() public save: EventEmitter<Item> = new EventEmitter<Item>();

  public form!: FormGroup;
  public readonly fruitOptions: { value: ItemFruit; text: string }[] = [
    { value: ItemFruit.Apple, text: 'Apple' },
    { value: ItemFruit.Banana, text: 'Banana' },
    { value: ItemFruit.Blueberry, text: 'Blueberry' },
    { value: ItemFruit.Cherry, text: 'Cherry' },
    { value: ItemFruit.Kiwi, text: 'Kiwi' },
  ];

  public ngOnChanges(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.name),
      fruit: new FormControl(this.data.fruit),
      flag: new FormControl(this.data.flag),
    });
  }

  public handleEdit(): void {
    const item: Item = { id: this.data.id, ...this.form.value };
    this.save.emit(item);
  }

  public handleCreate(): void {
    const item: Item = { id: '', ...this.form.value };
    this.save.emit(item);
  }
}
