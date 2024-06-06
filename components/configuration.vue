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
      <SelectableList :items="['Это фотография', 'Это зеркало']" />
      <DropZone />
    </div>
    <h1>Оформлятор</h1>
    <div class="div-config">
      <CheckboxOption label="Ножка сзади рамки:" />
      <CheckboxOption label="Доп. усиление углов:" />
      <CheckboxOption label="Тросик сзади рамки:" />
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
  <BaggueteChanger
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
import BaggueteChanger from "~/components/buggueteChanger.vue";

const currentWindow = ref(0);
const props = defineProps({ frame: { require: true } });
function changeWidth(newValue) {
  props.frame.w = Number(newValue);
}

function changeHeight(newValue) {
  props.frame.h = Number(newValue);
}

function setWindow(newValue) {
  currentWindow.value = Number(newValue);
}
</script>

<style scoped>
.div-configuration {
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
