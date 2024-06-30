<template>
  <div>
    <h1>Итоговая информация о заказе</h1>
    <p>Ширина: {{ frame.w }}</p>
    <p>Высота: {{ frame.h }}</p>
    <p>Артикул: {{ frame.baguetteId }}</p>
    <p>Опции: {{ frame.options }}</p>
    <p>Зеркало: {{ frame.isMirror ? "Да" : "Нет" }}</p>
    <p>Снаружи: {{ frame.isOutside ? "Да" : "Нет" }}</p>
    <CButton @click="confirmOrder">Подтвердить</CButton>
    <ErrorModal
      :body="errorText"
      :show="errorText !== ''"
      @close="closeError"
    />
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";
import { useRoute } from "vue-router";

const { $api } = useNuxtApp();
const route = useRoute();

import ErrorModal from "~/components/errorModal.vue";
import { createErrorMessage } from "~/utils/errorHandler.js";

const errorText = ref("");
function closeError() {
  errorText.value = "";
}

const frame = ref({
  w: 0,
  h: 0,
  options: [],
  baguetteId: "",
  isMirror: 0,
  isOutside: 0,
});

function getData() {
  frame.value.w = parseInt(route.query.w) || 0;
  frame.value.h = parseInt(route.query.h) || 0;
  frame.value.baguetteId = route.query.baguetteId || "";
  frame.value.isMirror = route.query.isMirror == "1";
  frame.value.isOutside = route.query.isOutside == "1";
  frame.value.options = route.query.options || [];
}

async function calculateSum() {
  try {
    const response = await $api.get("/api/v1/order/sum", frame, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

const confirmOrder = () => {
  alert("Заказ подтвержден!");
};

onMounted(() => {
  getData(), calculateSum();
});
</script>
