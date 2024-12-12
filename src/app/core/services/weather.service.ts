import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherApiService } from './weather-api.service';
import { CityWeather } from "../models";
import { SnackBarService } from "./snack-bar.service";

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly LOCAL_STORAGE_KEY = 'weather-cities';

  private citiesSubject = new BehaviorSubject<CityWeather[]>([]);
  public cities$: Observable<CityWeather[]> = this.citiesSubject.asObservable();

  private loader = new BehaviorSubject<boolean>(false);
  public showLoader$: Observable<boolean> = this.loader.asObservable();

  constructor(
    private weatherApi: WeatherApiService,
    private snackBar: SnackBarService,
  ) {
    const storedCities = this.loadCitiesFromLocalStorage();
    this.citiesSubject = new BehaviorSubject<CityWeather[]>(storedCities);
    this.cities$ = this.citiesSubject.asObservable();
  }

  addCity(cityName: string): void {

    const currentCities = this.citiesSubject.value;
    if (!currentCities.some((city) => city.name.toLowerCase() === cityName.toLowerCase())) {
      this.loader.next(true);
      this.weatherApi.getWeather(cityName).subscribe({
        next: (weather) => {
          const newCity: CityWeather = {
            name: weather.name,
            temperature: Math.round(weather.main.temp),
            condition: weather.weather[0].main,
          };
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
      });
    } else {
      this.snackBar.showMessage(`City ${cityName} is already in the list!`);
    }
  }

  removeCity(cityName: string): void {
    const updatedCities = this.citiesSubject.value.filter(
      (city) => city.name !== cityName
    );
    this.citiesSubject.next(updatedCities);
    this.saveCitiesToLocalStorage(updatedCities);
    this.snackBar.showMessage(`City ${cityName} successfully removed!`);
  }

  private loadCitiesFromLocalStorage(): CityWeather[] {
    const storedCities = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return storedCities ? JSON.parse(storedCities) : [];
  }

  private saveCitiesToLocalStorage(cities: CityWeather[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(cities));
  }
}
