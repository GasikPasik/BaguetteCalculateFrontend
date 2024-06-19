<template>
  <yandex-map
    v-model="map"
    :settings="{
      location: {
        center: [34.349167, 61.785833],
        zoom: 13,
      },
    }"
    width="100%"
    height="100%"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <yandex-map-marker
      v-for="point in points"
      :settings="{ coordinates: [points.x, points.y] }"
    >
      <Point>{{ point.label }}</Point>
    </yandex-map-marker>
  </yandex-map>
</template>

<script style>
const props = defineProps({ points: { default: {} } });
</script>
