<template>
  <div
    :style="{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1000px',
    }"
  >
    <transition name="main-menu">
      <div v-if="currentWindow === 0" class="div-configuration" key="config">
        <h1>Размерятор</h1>

        <div class="div-config">
          <SelectableList
            v-model="frame.isInner"
            :selectedIndex="frame.isInner"
            :items="['Внешний', 'Внутрений']"
          />
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
            :selectedIndex="frame.isMirror"
            :items="['Я хочу фотографию', 'Я хочу зеркало']"
            v-model="frame.isMirror"
          />
          <div class="dropzone" :class="{ active: frame.isMirror == 0 }">
            <DropZone v-model:modalUrl="frame.urlImage" />
          </div>
        </div>
        <h1>Оформлятор</h1>
        <div class="div-config">
          <CheckboxOption
            v-if="options.length > 0"
            v-for="i in options"
            :key="i.id"
            :label="i.title"
            :price="i.price"
            :description="i.description"
            :isQ="i.isDependsSize"
            :isChecked="
              frame.options.hasOwnProperty(i.id) ||
              frame.optionsDepends.hasOwnProperty(i.id)
            "
            @changeValue="addOption(i, $event)"
          />
          <p v-else :style="{ color: 'white', opacity: '60%' }">
            Загружаются опции заказа...
          </p>

          <div class="config-space"></div>
          <ButtonOption
            @clicked="setWindow(1)"
            :isActive="frame.baguetteId !== -1"
          >
            Багет рамки*
          </ButtonOption>
          <ButtonOption
            @clicked="setWindow(2)"
            :isActive="frame.glassId !== -1"
          >
            Стекло рамки*
          </ButtonOption>

          <div class="config-space"></div>

          <PassepartoutConfig :frame="frame" @clickedPass="handleClickedPass" />
        </div>
        <div class="config-space"></div>
      </div>
    </transition>
    <transition name="second-menu">
      <BaguetteChanger
        v-show="currentWindow === 1"
        :frame="frame"
        @back="setWindow(0)"
      />
    </transition>
    <transition name="second-menu">
      <GlassChanger
        v-show="currentWindow === 2"
        :frame="frame"
        @back="setWindow(0)"
      />
    </transition>
    <transition name="second-menu">
      <PassepartoutChanger
        v-show="currentWindow === 3"
        :frame="frame"
        @back="setWindow(0)"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";

import Slider from "~/components/ui/slider.vue";
import DropZone from "~/components/ui/dropZone.vue";
import ButtonOption from "~/components/ui/buttonOption.vue";
import SelectableList from "~/components/ui/selectableList.vue";
import CheckboxOption from "~/components/ui/checkboxOption.vue";

import BaguetteChanger from "~/components/buguetteChanger.vue";
import GlassChanger from "~/components/glassChanger.vue";
import PassepartoutConfig from "~/components/passepartoutConfig.vue";

const { $api } = useNuxtApp();

const currentWindow = ref(0);
const options = ref({});
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

function setSuffix(newValue) {
  console.log(newValue);
  if (newValue === 0) {
    props.frame.pass_cuffix = 1;
    if (newValue === 2 || (newValue !== 1 && props.frame.passId_1 !== -1))
      props.frame.pass_cuffix = 2;
  } else {
    props.frame.pass_cuffix = newValue;
  }
}

function handleClickedPass(idx = 0) {
  setSuffix(idx);
  setWindow(3);
}
function addOption(option, isAdd) {
  if (isAdd) {
    if (option.isDependsSize) {
      props.frame.optionsDepends[option.id] = option.price;
    } else {
      props.frame.options[option.id] = option.price;
    }
  } else {
    if (option.isDependsSize) {
      delete props.frame.optionsDepends[option.id];
    } else {
      delete props.frame.options[option.id];
    }
  }

  props.frame.isChangeOptions = !props.frame.isChangeOptions;
}

async function getOption() {
  try {
    const data = (await $api.get("/api/v1/options/")).data;
    data.sort((a, b) => {
      if (a.isDependsSize === false && b.isDependsSize === true) {
        return -1;
      } else if (a.isDependsSize === true && b.isDependsSize === false) {
        return 1;
      } else {
        return 0;
      }
    });
    options.value = data;
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
  text-align: start;
  padding-bottom: 40px;
}
.div-config {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 45px;
  align-items: start;
}

.div-config.info {
  color: white;
}

h1 {
  margin-bottom: 15px;
}

.config-space {
  height: 20px;
}

.dropzone {
  height: 0px;
  transition: height 0.1s ease-in-out;
  width: 100%;
  overflow: hidden;
}
.dropzone.active {
  height: 90px;
}

.main-menu-enter-from,
.main-menu-leave-to,
.second-menu-enter-from,
.second-menu-leave-to {
  opacity: 0%;
}

.main-menu-enter-to,
.main-menu-leave-from,
.second-menu-enter-to,
.second-menu-leave-from {
  /* transform: translateX(0%); */
  opacity: 100%;
}

.second-menu-enter-active,
.second-menu-leave-active,
.main-menu-enter-active,
.main-menu-leave-active {
  transition: transform 0.15s ease, opacity 0.15s ease;
}
</style>
