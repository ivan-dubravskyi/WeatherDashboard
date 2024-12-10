import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = '2ee271936988b64af133153b340102aa';

  constructor(private http: HttpClient) {}

  getWeather(cityName: string): Observable<WeatherResponse> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http
      .get<WeatherResponse>(this.baseUrl, { params })
  }
}
