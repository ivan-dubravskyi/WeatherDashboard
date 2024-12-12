import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from "../models";

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly apiKey = '2ee271936988b64af133153b340102aa';

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
}
