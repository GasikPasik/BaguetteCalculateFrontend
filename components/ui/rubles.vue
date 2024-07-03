<template>
  <span>{{ rubleText }}</span>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  rubles: {
    type: Number,
    default: 0,
  },
});

const rubleText = ref("");

function getRubleDeclension(num) {
  num = Math.abs(num);

  let lastTwoDigits = num % 100;
  let lastDigit = num % 10;

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return "рублей";
  }
  if (lastDigit === 1) {
    return "рубль";
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return "рубля";
  }
  return "рублей";
}

watch(
  () => props.rubles,
  (newVal) => {
    rubleText.value = getRubleDeclension(newVal);
  },
  { immediate: true }
);
</script>
