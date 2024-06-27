<template>Итого {{ sumToReal }} рублей</template>

<script setup>
const props = defineProps({
  frame: { type: Object, required: true },
});

const sumToPreview = ref(0);
const sumToReal = ref(0);

function calculate() {
  sumToReal.value = props.frame.optionsCost;
}

watch(
  () => [
    props.frame.w,
    props.frame.h,
    props.frame.optinsCost,
    props.frame.width,
  ],
  () => {
    calculate();
  }
);
</script>

<style scoped></style>
