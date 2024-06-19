<template>
  <div class="div-configuration" v-show="currentWindow === 0">
    <h1>Размерятор</h1>
    <div class="div-config">
      <SelectableList :items="['Внешний', 'Внутрений']" />
      <div class="div-config-sizing-slider"></div>
      <Slider
        nameField="Ширина"
        :startValue="frame.w"
        @changeValue="changeWidth"
      ></Slider>
      <Slider
        nameField="Высота"
        :startValue="frame.h"
        @changeValue="changeHeight"
      ></Slider>
    </div>
    <h1>Фотогратор</h1>
    <div class="div-config">
      <SelectableList
        :items="['Это фотография', 'Это зеркало']"
        v-model="frame.isMirror"
      />

      <DropZone v-if="frame.isMirror == 0" @uploadImage="uploadImage" />
    </div>
    <h1>Оформлятор</h1>
    <div class="div-config">
      <CheckboxOption v-for="i in options" :label="i.title" :price="i.price" />

      <div class="config-space"></div>
      <ButtonOption @clicked="setWindow(1)">Багет рамки</ButtonOption>
      <ButtonOption>Профиль рамки</ButtonOption>
      <ButtonOption>Стекло рамки</ButtonOption>
    </div>
    <h1>Общая информация</h1>
    <div class="div-config info">
      Рамка в высоту {{ frame.w }} см, в ширинук {{ frame.h }} см<br />
    </div>
  </div>
  <BaguetteChanger
    v-show="currentWindow === 1"
    :frame="frame"
    @back="setWindow(0)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Slider from "~/components/ui/slider.vue";
import SelectableList from "~/components/ui/selectableList.vue";
import DropZone from "~/components/ui/dropZone.vue";
import CheckboxOption from "~/components/ui/checkboxOption.vue";
import ButtonOption from "~/components/ui/buttonOption.vue";
import BaguetteChanger from "~/components/buguetteChanger.vue";

const { $api } = useNuxtApp();

const currentWindow = ref(0);
const options = ref({});
const props = defineProps({ frame: { require: true } });

const config = useRuntimeConfig();
const pathDefImage = config.public.pathDefImage;

function changeWidth(newValue) {
  props.frame.w = Number(newValue);
}

function changeHeight(newValue) {
  props.frame.h = Number(newValue);
}

function uploadImage(file) {
  console.log("VOT: ", props.frame.urlImage);
  if (file == "") props.frame.urlImage = pathDefImage;
  else props.frame.urlImage = URL.createObjectURL(file);
}

function setWindow(newValue) {
  currentWindow.value = Number(newValue);
}

async function getOption() {
  try {
    const response = await $api.get("/api/v1/options/");
    options.value = response.data;
  } catch (error) {
    options.value = {};
    console.error(error);
  }
}

onMounted(getOption);
</script>

<style scoped>
.div-configuration {
  width: 100%;
  height: 100%;
  text-align: center;
}
.div-config {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.div-config.info {
  color: white;
}

h1 {
  margin-top: 25px;
  margin-bottom: 5px;
}

.config-space {
  height: 20px;
}
</style>
