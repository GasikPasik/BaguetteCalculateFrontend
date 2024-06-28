<template>
  <div class="label-total-sum">
    Итого
    <p :style="{ fontSize: '32px' }">{{ sumToPreview.sumToReal.toFixed(0) }}</p>
    рублей
    <!-- (Цена за багет:
    {{ (props.frame.w + props.frame.h) * 2 * props.frame.widthWQ }})
    {{ props.frame.optionsDepends }}
    {{ props.frame.options }} -->
  </div>
</template>

<script setup>
import gsap from "gsap";
const props = defineProps({
  frame: { type: Object, required: true },
});

const sumToReal = ref(0);

const sumToPreview = reactive({
  sumToReal: 0,
});

function calculate() {
  sumToReal.value = 0;
  if (props.frame.baguetteCost === 0) {
    return;
  }
  console.log("123");
  for (let key in props.frame.options) {
    sumToReal.value += props.frame.options[key];
  }

  const square = props.frame.w * props.frame.h;

  for (let key in props.frame.optionsDepends) {
    sumToReal.value += props.frame.optionsDepends[key] * square;
  }

  let lenOfBag = (props.frame.w + props.frame.h) * 2 * props.frame.widthWQ;
  if (props.frame.isOutside === 0) lenOfBag += props.frame.widthWQ * 8;
  console.log(props.frame.baguetteCost);
  sumToReal.value += lenOfBag * props.frame.baguetteCost;

  sumToReal.value *= props.frame.count;
}

watch(
  () => [
    props.frame.w,
    props.frame.h,
    props.frame.isChangeOptions,
    props.frame.article,
    props.frame.width,
    props.frame.isOutside,
    props.frame.count,
  ],
  () => {
    calculate();
  }
);

watch(sumToReal, (n) => {
  gsap.to(sumToPreview, { duration: 0.3, sumToReal: Number(n) || 0 });
});
</script>

<style scoped>
.label-total-sum {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
