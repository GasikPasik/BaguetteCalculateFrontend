<template>
  <div class="label-total-sum">
    Итого
    <p :style="{ fontSize: '32px', minWidth: '110px' }">
      {{ sumToPreview.sumToReal.toFixed(2) }}
    </p>
    <Rubles :rubles="sumToReal" />
    <!-- (Цена за багет:
    {{ (props.frame.w + props.frame.h) * 2 * props.frame.widthWQ }})
    {{ props.frame.optionsDepends }}
    {{ props.frame.options }} -->
  </div>
</template>

<script setup>
import gsap from "gsap";
import Rubles from "~/components/ui/rubles.vue";
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
  for (let key in props.frame.options) {
    sumToReal.value += props.frame.options[key];
  }

  const square = (props.frame.w / 100) * (props.frame.h / 100);

  for (let key in props.frame.optionsDepends) {
    sumToReal.value += props.frame.optionsDepends[key] * square;
  }

  let lenOfBag = (props.frame.w / 100 + props.frame.h / 100) * 2;
  if (props.frame.isInner) lenOfBag += (props.frame.widthWQ * 8) / 100;
  sumToReal.value += lenOfBag * props.frame.baguetteCost;

  sumToReal.value += square * props.frame.glassCost;

  sumToReal.value *= props.frame.count;
}

watch(
  () => [
    props.frame.w,
    props.frame.h,
    props.frame.isChangeOptions,
    props.frame.article,
    props.frame.width,
    props.frame.isInner,
    props.frame.count,
    props.frame.glassId,
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
