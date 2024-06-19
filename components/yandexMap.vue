<template>
  <YMap
    :settings="{ zoom: 10, center: [55.751574, 37.573856] }"
    style="width: 100%; height: 400px"
  >
    <YMapMarker
      :geometry="[55.751574, 37.573856]"
      :properties="{ balloonContent: 'Москва' }"
      :options="{ preset: 'islands#redDotIcon' }"
    />
  </YMap>
</template>

<script setup>
import { YMap, YMapMarker } from "vue-yandex-maps";
</script>
