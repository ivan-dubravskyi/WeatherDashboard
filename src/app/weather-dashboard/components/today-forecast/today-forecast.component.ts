import { Component, Input } from '@angular/core';
import { getWeatherIcon } from "../../../core/utils/weather-icons.helper";
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { TodayForecast } from "../../../core/models";

@Component({
  selector: 'app-today-forecast',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './today-forecast.component.html',
  styleUrl: './today-forecast.component.scss'
})
export class TodayForecastComponent {
  @Input() todayForecast!: TodayForecast[] | null;

  getWeatherIcon = getWeatherIcon;
}
