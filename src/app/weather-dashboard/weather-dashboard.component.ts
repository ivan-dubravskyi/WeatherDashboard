import { Component, OnInit } from '@angular/core';
import { CitySearchComponent } from "./components/city-search/city-search.component";
import { CityCardComponent } from "./components/city-card/city-card.component";
import { WeatherService } from "../core/services/weather.service";
import { LoaderComponent } from "../core/components/loader/loader.component";
import { AsyncPipe} from "@angular/common";
import { CityWeather } from "../core/models";
import { TodayForecastComponent } from "./components/today-forecast/today-forecast.component";
import { ForecastService } from "../core/services/forecast.service";
import { DailyForecastComponent } from "./components/daіly-forecast/daily-forecast.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [
    CitySearchComponent,
    CityCardComponent,
    LoaderComponent,
    AsyncPipe,
    TodayForecastComponent,
    DailyForecastComponent,
    MatProgressSpinner
  ],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss'
})
export class WeatherDashboardComponent implements OnInit {

  cities$ = this.weatherService.cities$;
  showLoader$= this.weatherService.showLoader$;

  selectedCity: CityWeather | null = null;
  todayForecast$ = this.forecastService.todayForecast$;
  dailyForecast$ = this.forecastService.dailyForecast$;
  showForecastLoader$= this.forecastService.showForecastLoader$;

  constructor(private weatherService: WeatherService,
              public forecastService: ForecastService) {}

  ngOnInit() {
    this.weatherService.initWeathers();
  }

  onAddCity(cityName: string): void {
    this.weatherService.addCity(cityName);
  }

  onCityRemove(cityName: string): void {
    this.weatherService.removeCity(cityName);
  }

  toggleCard(city: CityWeather) {
    if (city === this.selectedCity) {
      this.selectedCity = null;
    } else {
      this.forecastService.getForecast(city.name);
      this.selectedCity = city;
    }
  }
}
