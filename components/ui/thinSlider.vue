<template>
  <div class="main-div">
    <div class="nameField">{{ nameField }}</div>
    <div class="slider">
      <div v-if="isSlider" class="slider-wrapper" ref="sliderWrapper">
        <div class="slider-track">
          <input
            class="slider-input"
            type="range"
            :min="minValue"
            :max="maxValue"
            v-model="sliderValue"
            @input="updateFromSlider"
          />
          <div class="slider-thumb"></div>
        </div>
      </div>
      <input
        v-if="isInput"
        class="input-value"
        v-model="inputValue"
        @input="validateInput"
        @blur="endInput"
      />
      см
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const emit = defineEmits(["changeValue"]);
const props = defineProps({
  nameField: {
    type: String,
    default: "",
  },
  minValue: {
    type: Number,
    default: 10,
  },
  maxValue: {
    type: Number,
    default: 250,
  },
  startValue: {
    type: Number,
    default: 50,
  },
  isInput: {
    type: Boolean,
    default: true,
  },
  isSlider: {
    type: Boolean,
    default: true,
  },
});

const sliderValue = ref(props.startValue);
const inputValue = ref(props.startValue);
const sliderWrapper = ref(null);

const updateFromSlider = () => {
  inputValue.value = sliderValue.value.toString();
  emitChangeVal(sliderValue.value);
  updateSlider();
};

const validateInput = () => {
  let correctValue = inputValue.value.toString();
  correctValue = correctValue.replace(",", ".").replace(/[^\d.]/g, "");
  if (correctValue.length > 5) {
    correctValue = correctValue.slice(0, 5);
  }
  if (correctValue === "") {
    sliderValue.value = props.minValue;
    return;
  }

  let numericValue = parseFloat(correctValue);
  if (isNaN(numericValue)) {
    numericValue = props.minValue;
  }

  if (numericValue < 0) inputValue.value = 0;
  else if (numericValue > props.maxValue) inputValue.value = props.maxValue;

  if (numericValue < props.minValue) {
    numericValue = props.minValue;
  } else if (numericValue > props.maxValue) {
    numericValue = props.maxValue;
  }

  sliderValue.value = numericValue;
  emitChangeVal(numericValue);
};

const endInput = () => {
  let numericValue = parseFloat(inputValue.value);

  if (isNaN(numericValue) || numericValue < props.minValue) {
    numericValue = props.minValue;
  } else if (numericValue > props.maxValue) {
    numericValue = props.maxValue;
  }

  inputValue.value = numericValue.toString();
  sliderValue.value = numericValue;
  emitChangeVal(numericValue);
};

const emitChangeVal = (value) => {
  emit("changeValue", value);
};

const updateSlider = () => {
  const wrapper = sliderWrapper.value;
  wrapper.style.setProperty(
    "--slider-value",
    ((sliderValue.value - props.minValue) / (props.maxValue - props.minValue)) *
      100
  );
};

watch(sliderValue, updateSlider);
watch(inputValue, (newValue) => {
  if (newValue !== sliderValue.value.toString()) {
    sliderValue.value = parseFloat(newValue);
  }
});

onMounted(() => {
  updateSlider();
});
</script>

<style scoped>
.main-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;
}
.nameField {
  color: white;
}
.slider {
  display: flex;
  flex-direction: row;
  gap: 15px;
  color: white;
  align-items: center;
}

.input-value {
  max-width: 90px;
  padding: 2px;
  text-align: center;
  border: none;
  outline: none;
  -webkit-box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.25) inset;
  -moz-box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.25) inset;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.25) inset;
  transform: scale(100%);
  transition: transform 0.1s ease-in-out;
}

.input-value:hover,
.input-value:focus,
.input-value:active {
  transform: scale(104%);
}
.input-valu:active {
  border: none;
}
.slider-wrapper {
  --slider-height: 0.2em;
  --width-thumb: 0.8em;
  --height-thumb: 0.8em;
  --slider-value: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  position: relative;
  background: none;

  --slider-color: var(--main-color);
}

.slider-track {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: inherit;
  height: var(--slider-height);
  width: 100%;
  background-image: linear-gradient(
    to right,
    var(--slider-color) 0%,
    var(--slider-color) calc(var(--slider-value) * 1%),
    white calc(var(--slider-value) * 1%) 100%
  );
  background-blend-mode: overlay, normal;
  box-shadow: inset 0 0.0625em 0.125em rgb(0 0 0 / 0.4);
}

.slider-input {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  border-radius: inherit;
  width: calc(100% + 0.875em);
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.slider-input::-webkit-slider-thumb {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 50%;
  padding: 0.5em;
  width: var(--width-thumb);
  height: var(--height-thumb);
  background-color: var(--slider-color);
}

.slider-input::-moz-range-thumb {
  border-radius: 50%;
  padding: 0.5em;
  width: var(--width-thumb);
  height: var(--height-thumb);
  background-color: var(--slider-color);
}

.slider-thumb {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(
    var(--slider-value) / 100 * (100% - var(--slider-height)) +
      var(--slider-height) / 2
  );
  transform: translateX(-50%);
  border-radius: 5px;
  width: var(--width-thumb);
  height: var(--height-thumb);
  background-color: var(--slider-color);
  box-shadow: 0 0.125em 0.25em rgb(0 0 0 / 0.3);
}
</style>
