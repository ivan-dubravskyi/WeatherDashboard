import { Component, Input } from '@angular/core';
import { getWeatherIcon } from "../../../core/utils/weather-icons.helper";
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { DailyForecast } from "../../../core/models";
import { MatSliderModule } from "@angular/material/slider";

@Component({
  selector: 'app-daily-forecast',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe,
    MatSliderModule
  ],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.scss'
})
export class DailyForecastComponent {
  @Input() set dailyForecast(forecast: DailyForecast[] | null) {
    this.forecast = forecast;
    this.globalMin = this.globalMinTemperature()
    this.globalMax = this.globalMaxTemperature()
  }
  public forecast!: DailyForecast[] | null;
  public globalMin!: number | null;
  public globalMax!: number | null;

  getWeatherIcon = getWeatherIcon;

  globalMinTemperature(): number | null {
    if (!this.forecast || this.forecast.length === 0) {
      return null;
    }
    return Math.min(...this.forecast.map(forecast => forecast.minTemperature));
  }

  globalMaxTemperature(): number | null {
    if (!this.forecast || this.forecast.length === 0) {
      return null;
    }
    return Math.max(...this.forecast.map(forecast => forecast.maxTemperature));
  }
}
