import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherApiService } from './weather-api.service';
import { DailyForecast, ForecastResponse, TodayForecast } from "../models";

@Injectable({
  providedIn: 'root',
})
export class ForecastService {

  private todayForecastSubject = new BehaviorSubject<TodayForecast[]>([]);
  public todayForecast$: Observable<TodayForecast[]> = this.todayForecastSubject.asObservable();

  private dailyForecastSubject = new BehaviorSubject<DailyForecast[]>([]);
  public dailyForecast$: Observable<DailyForecast[]> = this.dailyForecastSubject.asObservable();

  private forecastLoader = new BehaviorSubject<boolean>(false);
  public showForecastLoader$: Observable<boolean> = this.forecastLoader.asObservable();

  constructor(
    private weatherApi: WeatherApiService,
  ) { }

  getForecast(cityName: string) {
    this.forecastLoader.next(true);
    this.weatherApi.getForecast(cityName).subscribe({
      next: (forecast) => {
        this.todayForecastSubject.next(this.extractTodayForecast(forecast))
        this.dailyForecastSubject.next(this.extractDailyForecast(forecast))
        this.forecastLoader.next(false);
      },
      error: () => {
        this.forecastLoader.next(false);
      }
    })
  }



// These two methods, `extractTodayForecast` and `extractDailyForecast`, were written
// to mock the data format needed for the application. The free version of OpenWeatherMap
// API does not provide the specific data format required, so these methods process and
// restructure the available forecast data to fit the application's needs.

  extractTodayForecast(forecast: ForecastResponse): TodayForecast[] {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000; // End of today's time in milliseconds

    // Filter forecast for today
    let todayForecast = forecast.list
      .filter(weather => {
        const forecastTime = weather.dt * 1000;
        return forecastTime >= startOfDay && forecastTime < endOfDay;
      })
      .map(weather => ({
        temperature: Math.round(weather.main.temp),
        condition: weather.weather[0].main,
        icon: weather.weather[0].icon,
        time: weather.dt * 1000,
      }));

    // If today's forecast is insufficient, include the next day
    if (todayForecast.length <= 3) {
      const nextDayStart = endOfDay;
      const nextDayEnd = nextDayStart + 24 * 60 * 60 * 1000; // End of next day's time in milliseconds

      const nextDayForecast = forecast.list
        .filter(weather => {
          const forecastTime = weather.dt * 1000;
          return forecastTime >= nextDayStart && forecastTime < nextDayEnd;
        })
        .map(weather => ({
          temperature: Math.round(weather.main.temp),
          condition: weather.weather[0].main,
          icon: weather.weather[0].icon,
          time: weather.dt * 1000,
        }));

      todayForecast = [...todayForecast, ...nextDayForecast];
    }

    return todayForecast;
  }


  extractDailyForecast(forecast: ForecastResponse): DailyForecast[] {
    const groupedByDay = new Map<string, {
      temperatures: number[];
      icons: { [key: string]: number };
    }>();

    forecast.list.forEach(weather => {
      const date = new Date(weather.dt * 1000).toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
      if (!groupedByDay.has(date)) {
        groupedByDay.set(date, { temperatures: [], icons: {} });
      }

      const dayData = groupedByDay.get(date)!;

      dayData.temperatures.push(weather.main.temp);

      const icon = weather.weather[0].icon;
      dayData.icons[icon] = (dayData.icons[icon] || 0) + 1;
    });

    // Transform data into desired output
    return  Array.from(groupedByDay.entries()).map(([date, data]) => {
      const minTemperature = Math.min(...data.temperatures);
      const maxTemperature = Math.max(...data.temperatures);

      // Determine the most common icon
      const averageIcon = Object.entries(data.icons).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];

      return {
        date,
        minTemperature: Math.round(minTemperature),
        maxTemperature: Math.round(maxTemperature),
        averageIcon,
      };
    });
  }
}
