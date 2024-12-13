import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ForecastResponse, WeatherResponse } from "../models";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private readonly baseUrl = environment.API_URL;
  private readonly apiKey = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getWeather(cityName: string): Observable<WeatherResponse> {
    const params = {
      q: cityName,
      appid: this.apiKey,
      units: 'metric',
    };

    return this.http
      .get<WeatherResponse>(`${this.baseUrl}/weather`, { params })
  }

  getForecast(cityName: string): Observable<ForecastResponse> {
    const params = {
      q: cityName,
      appid: this.apiKey,
      units: 'metric',
    };
    return this.http
      .get<ForecastResponse>(`${this.baseUrl}/forecast`, { params })
  }
}
