<template>
  <div class="div-totalinfo">
    <div v-if="!isEnough" class="label-not-enogh">
      Дата увеличина, из-за временной не хватки багета
    </div>
    <div class="div-top-totalinfo">
      {{ futureDate }}
      <CounterInput v-model="frame.count" />
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
import { getFutureWorkingDate } from "~/utils/workingDays";

const props = defineProps({ frame: { type: Object, require: true } });
const router = useRouter();

const futureDate = ref();
const isEnough = ref(true);

function ordering() {
  const params = new URLSearchParams({
    w: props.frame.w,
    h: props.frame.h,
    baguetteId: props.frame.baguetteId,
    isMirror: props.frame.isMirror,
    isInner: props.frame.isInner,
    options: [
      ...Object.keys(props.frame.options),
      ...Object.keys(props.frame.optionsDepends),
    ],
  }).toString();

  router.push(`/order?${params}`);
}

function formatFutureDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const dayOfWeek = date.toLocaleDateString("ru-RU", { weekday: "short" });
  return `Будет готово с ${day}.${month} (${dayOfWeek}) после 15:00`;
}
function calculateDate() {
  let lenghtOfBag = (props.frame.w / 100 + props.frame.h / 100) * 2;
  if (props.frame.isInner) lenghtOfBag += (props.frame.widthWQ * 8) / 100;

  isEnough.value =
    props.frame.baguetteCost === 0 || lenghtOfBag < props.frame.stock;

  let date;
  if (isEnough.value) date = getFutureWorkingDate(3);
  else date = getFutureWorkingDate(5);

  futureDate.value = formatFutureDate(date);
}

watch(
  () => [
    props.frame.w,
    props.frame.h,
    props.frame.article,
    props.frame.isInner,
  ],
  () => {
    calculateDate();
  }
);
onMounted(calculateDate);
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

  background-color: rgba(255, 255, 255, 0.14);
  border: 8px solid rgba(133, 133, 133, 0.12);
  padding: 20px;
  border-radius: 5px;
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

.label-not-enogh {
  font-size: 14px;
  color: rgba(80, 8, 8, 0.8);
}
</style>
