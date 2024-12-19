import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CityWeather } from "../../../core/models";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { getWeatherIcon } from "../../../core/utils/weather-icons.helper";

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent {
  @Input() cityWeather!: CityWeather;
  @Output() removeCity = new EventEmitter<void>();

  onRemove(): void {
    this.removeCity.emit();
  }

  getWeatherIcon = getWeatherIcon;

  getCardBackground(icon: string): string {
    switch (icon) {
      case '01d': return 'clear-day';
      case '01n': return 'clear-night';
      case '02d': return 'few-clouds-day';
      case '02n': return 'few-clouds-night';
      case '03d': case '03n': return 'scattered-clouds';
      case '04d': case '04n': return 'broken-clouds';
      case '09d': return 'shower-rain-day';
      case '09n': return 'shower-rain-night';
      case '10d': return 'rain-day';
      case '10n': return 'rain-night';
      case '11d': return 'thunderstorm-day'
      case '11n': return 'thunderstorm-night';
      case '13d': return 'snow-day'
      case '13n': return 'snow-night';
      case '50d': case '50n': return 'mist';
      default: return 'default-bg';
    }
  }
}
