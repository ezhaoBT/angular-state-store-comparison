import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-mask',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-mask.component.html',
  styleUrl: './loading-mask.component.scss',
})
export class LoadingMaskComponent {}
