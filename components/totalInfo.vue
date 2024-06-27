<template>
  <div class="div-totalinfo">
    <div class="div-top-totalinfo">
      Будет готово с 13.03 (вт) после 13:00
      <br /><CounterInput />
    </div>
    <div class="div-bottom-totalinfo">
      <CalculateSum :frame="frame" />
      <button class="btn-ordering" @click="ordering">Заказать</button>
    </div>
  </div>
</template>

<script setup>
import CounterInput from "~/components/ui/counterInput.vue";
import CalculateSum from "~/components/calculateSum.vue";

const props = defineProps({ frame: { type: Object, require: true } });

function ordering() {
  const params = new URLSearchParams({
    w: frame.value.w,
    h: frame.value.h,
    article: frame.value.article,
    isMirror: frame.value.isMirror ? 1 : 0,
    isOutside: frame.value.isOutside ? 1 : 0,
  }).toString();

  router.push(`/order?${params}`);
}
</script>

<style scoped>
.btn-ordering {
  justify-self: flex-end;
  width: 120px;
  padding: 7px;
  border: none;
  background-color: var(--dark-grey-color);
  color: white;

  transition: transform 0.1s ease-in-out;
  transform: scale(100%);
}
.btn-ordering:hover {
  color: var(--main-color);
}
.btn-ordering:active {
  transform: scale(115%);
}

.div-totalinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  font-weight: 550;
}

.div-top-totalinfo {
  justify-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.div-bottom-totalinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
