<script lang="ts" setup>
import { computed } from "vue";
import type { WeatherProps } from "./types.ts";
import { checkDay, convertPressure, convertTemperature } from "./helpers.ts";
import WeatherIcon from "./WeatherIcon.vue";

const props = defineProps<WeatherProps>()

const alertMessage = computed(() => `${props.alert?.sender_name}:\n${props.alert?.description}`)

const isNight = computed(() => !checkDay(props.currentState.dt, props.currentState.sunrise, props.currentState.sunset))

const actualPressure = computed(() => convertPressure(props.currentState.pressure))

const actualTemperature = computed(() => convertTemperature(props.currentState.temp))

const weatherDetailsElements = computed(() => [
    { label: 'Давление, мм рт. ст.' , value: actualPressure.value },
    { label: 'Влажность, %' , value: props.currentState.humidity },
    { label: 'Облачность, %' , value: props.currentState.clouds },
    { label: 'Ветер, м/с' , value: props.currentState.wind_speed },
  ])
</script>

<template>
  <li
    class="weather-card"
    :class="{'weather-card--night': isNight}"
  >
    <div
      v-if="alert"
      class="weather-alert"
    >
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">{{ alertMessage }}</span>
    </div>
    <div>
      <h2 class="weather-card__name">
        {{ geographicName }}
      </h2>
      <div class="weather-card__time">
        {{ currentState.dt }}
      </div>
    </div>
    <div class="weather-conditions">
      <WeatherIcon :icon-id="currentState.weather.id" :description="currentState.weather.description"/>
      <div class="weather-conditions__temp">{{ actualTemperature }} °C</div>
    </div>
    <div class="weather-details">
      <div v-for="element in weatherDetailsElements" :key="element.label" class="weather-details__item">
        <div class="weather-details__item-label"> {{ element.label }} </div>
        <div class="weather-details__item-value">{{ element.value }}</div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  box-shadow: 0 2px 16px #0000001f;
  background-color: var(--white);
}

.weather-card--night {
  background-color: #dee1e1;
}

.weather-card__name {
  position: relative;
}

.weather-card__time {
  color: var(--grey-8);
}

.weather-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}

.weather-details__item {
  display: flex;
  flex-direction: column;
}

.weather-details__item-label {
  color: var(--grey-8);
}

.weather-alert {
  background-color: #fff2cc;
  padding: 10px;
}

.weather-alert__icon {
  margin-right: 10px;
}

.weather-conditions {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 48px;
  font-weight: lighter;
}
</style>
