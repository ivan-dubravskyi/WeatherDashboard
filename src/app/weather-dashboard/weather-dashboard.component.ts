import { Component, OnInit } from '@angular/core';
import { CitySearchComponent } from "./components/city-search/city-search.component";
import { CityCardComponent } from "./components/city-card/city-card.component";
import { WeatherService } from "../core/services/weather.service";
import { CityWeather } from "../core/models";
import {LoaderComponent} from "../core/components/loader/loader.component";
import {Observable} from "rxjs";
import {AsyncPipe, CommonModule} from "@angular/common";

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CitySearchComponent,
    CityCardComponent,
    LoaderComponent,
    AsyncPipe
  ],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss'
})
export class WeatherDashboardComponent implements OnInit {
  cities: CityWeather[] = [];
  public showLoader$: Observable<boolean> | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.cities$.subscribe((cities) => {
      this.cities = cities;
    });
    this.showLoader$ = this.weatherService.showLoader$;
  }
  onAddCity(cityName: string): void {
    this.weatherService.addCity(cityName);
  }

  onCityRemove(cityName: string): void {
    this.weatherService.removeCity(cityName);
  }
}
