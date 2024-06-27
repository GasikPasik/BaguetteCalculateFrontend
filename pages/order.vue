<template>
  <div>
    <h1>Итоговая информация о заказе</h1>
    <p>Ширина: {{ frame.w }}</p>
    <p>Высота: {{ frame.h }}</p>
    <p>Артикул: {{ frame.article }}</p>
    <p>Зеркало: {{ frame.isMirror ? "Да" : "Нет" }}</p>
    <p>Снаружи: {{ frame.isOutside ? "Да" : "Нет" }}</p>
    <button @click="confirmOrder">Подтвердить</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const frame = ref({
  w: 0,
  h: 0,
  options: [],
  article: "",
  isMirror: 0,
  isOutside: 0,
});

const confirmOrder = () => {
  alert("Заказ подтвержден!");
};

onMounted(() => {
  frame.value.w = parseInt(route.query.w) || 0;
  frame.value.h = parseInt(route.query.h) || 0;
  frame.value.article = route.query.article || "";
  frame.value.isMirror = route.query.isMirror == "1" ? 1 : 0;
  frame.value.isOutside = route.query.isOutside == "1" ? 1 : 0;
});
</script>
