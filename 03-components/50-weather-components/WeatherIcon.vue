<script setup lang="ts">
import { WeatherConditionIcons } from "./weather.service.ts";
import type { WeatherIcon } from "./types.ts";

const props = defineProps<WeatherIcon>()

const weatherIcon = WeatherConditionIcons[props.iconId];
</script>

<template>

  <div
    class="weather-conditions__icon"
    :title="description"
  >
    {{ weatherIcon }}
  </div>z
</template>
