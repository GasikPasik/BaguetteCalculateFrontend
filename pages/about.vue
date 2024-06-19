<template>
  <div class="main-div">
    <div class="block-text">
      <h1>Информация о нас</h1>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, onMounted } from "vue";
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from "vue-yandex-maps";

import Point from "~/components/ui/point.vue";

const positionX = 34.349167;
const positionY = 61.785833;
const map = shallowRef(null);

onMounted(() => {
  console.log("Position X:", positionX);
  console.log("Position Y:", positionY);
});
</script>

<style scoped>
.main-div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.block-text {
  background-color: var(--dark-grey-color);
  width: 60%;
  height: 60%;
  box-shadow: 0px 0px 50px 5px rgba(10, 10, 10, 0.3);
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: white;
}
</style>
