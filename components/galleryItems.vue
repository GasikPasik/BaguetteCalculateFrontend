<template>
  <div class="changer-div">
    <h1>{{ label }}</h1>
    <div class="changer-header">
      <div>Ну тут будут фильтры</div>
      <CButton @click="emit('back')">Назад</CButton>
    </div>
    <p v-if="isEmpty" :style="{ color: 'white', opacity: '60%' }">
      Загружаем ассортимент...
    </p>
    <div v-else class="gallery">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";
const props = defineProps({
  label: { require: true, type: String },
  sortProp: { require: false, type: Object },
  isEmpty: { default: true, type: Boolean },
});

const emit = defineEmits(["back"]);
</script>

<style scoped>
.changer-div {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.changer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding-bottom: 20px;
}
.gallery {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 10px; */
  overflow-y: scroll;
  padding: 20px 10px;
  background-color: rgba(255, 255, 255, 0.02);
  max-height: 100vh;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 10px;
}
</style>
