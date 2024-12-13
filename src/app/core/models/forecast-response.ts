import {WeatherResponse} from "./weather-response";

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherResponse[];
  city: CityInfo;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
