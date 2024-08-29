import type { WeatherConditionIcons } from "@/weather.service.ts";

type Nullable<T> = T | null

type Alert = {
  sender_name: string
  description: string
}

export type WeatherIconId = keyof typeof WeatherConditionIcons

type CurrentWeather = {
  id: WeatherIconId
  main: string
  description: string
}

type CurrentState = {
  dt: string
  sunrise: string
  sunset: string
  temp: number
  pressure: number
  humidity: number
  clouds: number
  visibility: number
  wind_speed: number
  weather: CurrentWeather
}

export type WeatherProps = {
  geographicName: string
  currentState: CurrentState
  alert: Nullable<Alert>
}

export type WeatherIcon = {
  iconId: WeatherIconId,
  description: string
}
