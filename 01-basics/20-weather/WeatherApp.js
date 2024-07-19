import { defineComponent } from "vue/dist/vue.esm-bundler.js";
import { getWeatherData, WeatherConditionIcons } from "./weather.service.ts";

export default defineComponent({
  name: "WeatherApp",
  data() {
    return {
      locations: getWeatherData(),
    };
  },

  computed: {
    weatherIcons() {
      return WeatherConditionIcons;
    }
  },

  methods: {
    convertTemperature(kelvins) {
      return (kelvins - 273.15).toFixed(1);
    },

    convertPressure(MPa) {
      return (MPa * 0.75).toFixed(0);
    },

    checkDay(time, sunrise, sunset) {
      const sunHasRisen = Date.parse(`01.01.2020 ${time}`) > Date.parse(`01.01.2020 ${sunrise}`);
      const sunHasntSet = Date.parse(`01.01.2020 ${time}`) < Date.parse(`01.01.2020 ${sunset}`);
      return sunHasRisen && sunHasntSet;
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li
          v-for="location in locations"
          :key="location.geographic_name"
          class="weather-card"
          :class="{'weather-card--night': !checkDay(location.current.dt, location.current.sunrise, location.current.sunset)}"
        >
          <div
            v-if="location.alert"
            class="weather-alert"
          >
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ location.alert.sender_name + location.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ location.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ location.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div
              class="weather-conditions__icon"
              :title="location.current.weather.description"
            >
              {{ weatherIcons[location.current.weather.id] }}️
            </div>
            <div class="weather-conditions__temp">{{ convertTemperature(location.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ convertPressure(location.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ location.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ location.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ location.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
});
