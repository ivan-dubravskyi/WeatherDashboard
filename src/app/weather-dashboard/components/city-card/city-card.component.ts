import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent {
  @Input() cityName!: string;
  @Input() temperature!: number;
  @Input() condition!: string;
  @Output() removeCity = new EventEmitter<void>();

  onRemove(): void {
    this.removeCity.emit();
  }
}
