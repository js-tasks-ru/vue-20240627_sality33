<script lang="ts" setup>
import WeatherCard from "./WeatherCard.vue";
import { getWeatherData } from "./weather.service.ts";

const locations = getWeatherData();
</script>

<template>
  <div>
    <h1 class="title">Погода в Средиземье</h1>

    <ul class="weather-list unstyled-list">
      <WeatherCard
        v-for="location in locations"
        :key="location.geographic_name"
        :alert="location.alert"
        :geographic-name="location.geographic_name"
        :current-state="location.current"
      />
    </ul>
  </div>
</template>

<style scoped>
.weather-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
}
</style>
