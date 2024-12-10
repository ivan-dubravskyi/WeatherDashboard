import { Component } from '@angular/core';
import { WeatherApiService } from "../core/services/weather-api.service";
import { CitySearchComponent } from "./components/city-search/city-search.component";
import {CityCardComponent} from "./components/city-card/city-card.component";

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CitySearchComponent, CityCardComponent],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss'
})
export class WeatherDashboardComponent {

  cities: { name: string; temperature: number; condition: string }[] = [];

  constructor(private weatherApi: WeatherApiService) {}

  onCitySearch(cityName: string): void {
    this.weatherApi.getWeather(cityName).subscribe((res) => {
      const city = {
        name: res.name,
        temperature: Math.round(res.main.temp),
        condition: res.weather[0].main,
      };
      this.cities.push(city);
    });
  }

  onCityRemove(cityName: string): void {
    this.cities = this.cities.filter((city) => city.name !== cityName);
  }
}
