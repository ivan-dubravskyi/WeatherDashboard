import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { WeatherApiService } from './weather-api.service';
import { CityWeather, WeatherResponse } from "../models";
import { SnackBarService } from "./snack-bar.service";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly LC_KEY_WEATHER_CITIES = 'weather-cities';

  private citiesSubject = new BehaviorSubject<CityWeather[]>([]);
  public cities$: Observable<CityWeather[]> = this.citiesSubject.asObservable();

  private loader = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.loader.asObservable();

  constructor(
    private weatherApi: WeatherApiService,
    private snackBar: SnackBarService,
  ) { }

  addCity(cityName: string): void {
    const currentCities = this.citiesSubject.value;

    if (currentCities.some((city) => city.name.toLowerCase() === cityName.trim().toLowerCase())) {
      this.snackBar.showMessage(`City ${cityName} is already in the list!`);
      return;
    }

    this.loader.next(true);

    this.getWeather(cityName)
      .subscribe({
        next: (newCity) => {
          const updatedCities = [...currentCities, newCity];
          this.citiesSubject.next(updatedCities);
          this.saveCitiesToLocalStorage(updatedCities);
          this.snackBar.showMessage(`City ${cityName} added successfully!`);
          this.loader.next(false);
        },
        error: () => {
          this.snackBar.showMessage(
            `Failed to fetch weather data for ${cityName}`,
            'Dismiss'
          );
          this.loader.next(false);
        },
      })
  }

  initWeathers() {
    const storedCitiesNames = this.loadCitiesFromLocalStorage();

    if (!storedCitiesNames.length) {
      return;
    }
    this.getWeatherForCities(storedCitiesNames)
  }

  removeCity(cityName: string): void {
    const updatedCities = this.citiesSubject.value.filter(
      (city) => city.name !== cityName
    );
    this.citiesSubject.next(updatedCities);
    this.saveCitiesToLocalStorage(updatedCities);
    this.snackBar.showMessage(`City ${cityName} successfully removed!`);
  }

  private getWeatherForCities(cities: string[]) {
    const requests  = cities.map(city => this.getWeather(city))

    this.loader.next(true);
    return combineLatest(requests).subscribe(
      {
        next: (cities: CityWeather[]) => {
          this.citiesSubject.next(cities);
          this.loader.next(false);
        },
        error: () => {
          this.snackBar.showMessage(
            `Failed to fetch weather data`,
            'Dismiss'
          );
          this.loader.next(false);
        }
      }
    )
  }

  private getWeather(cityName: string): Observable<CityWeather> {
    return this.weatherApi.getWeather(cityName).pipe(
      map(weather => this.convertToCityWeather(weather)),
    )
  }

  private convertToCityWeather(weather: WeatherResponse): CityWeather {
    return {
      name: weather.name,
      temperature: Math.round(weather.main.temp),
      condition: weather.weather[0].main,
      icon: weather.weather[0].icon,
    };
  }

  private loadCitiesFromLocalStorage(): string[] {
    const storedCities = localStorage.getItem(this.LC_KEY_WEATHER_CITIES);
    return storedCities ? JSON.parse(storedCities) : [];
  }

  private saveCitiesToLocalStorage(cities: CityWeather[]): void {
    localStorage.setItem(
      this.LC_KEY_WEATHER_CITIES,
      JSON.stringify(cities.map(city => city.name))
    );
  }
}
