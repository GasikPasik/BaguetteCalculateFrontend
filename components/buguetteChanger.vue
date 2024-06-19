<template>
  <div class="baguette-config">
    <h1>Выбрать багет</h1>
    <div class="baguette-header">
      <div>Ну тут будут фильтры</div>
      <CButton @click="emit('back')">Назад</CButton>
    </div>
    <div class="gallery">
      <div
        v-for="(bag, idx) in baguettes"
        :key="bag"
        class="baguette"
        :class="{ active: bag.article === frame.article }"
        @click="changeBaguette(idx)"
      >
        <BaguetteIcon :article="bag.article" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";
import BaguetteIcon from "~/components/baguetteIcon.vue";
const { $api } = useNuxtApp();

const emit = defineEmits(["back"]);
const props = defineProps({ frame: { require: true } });

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const baguettes = ref([]);
async function uploadingBagguet() {
  try {
    const response = await $api.get("/api/v1/baguettes/");
    baguettes.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

function changeBaguette(idx) {
  props.frame.costBaguette = baguettes.value[idx].price;
  props.frame.width = baguettes.value[idx].width;
  props.frame.article = baguettes.value[idx].article;
}

onMounted(uploadingBagguet);
</script>

<style scoped>
.baguette-config {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.baguette-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding-bottom: 20px;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  height: 100%;
  overflow-y: scroll;
}
.baguette {
  width: 150px;
  height: 150px;
  background-color: white;
  padding: 8px;
  border: 4px solid white;
  border-radius: 4px;
}
.baguette.active {
  border: 4px solid var(--main-color);
}
</style>
