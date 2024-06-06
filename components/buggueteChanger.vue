<template>
  <div class="bagguete-config">
    <h1>Выбрать багет</h1>
    <div class="bagguete-header">
      <div>Ну тут будут фильтры</div>
      <CButton @click="emit('back')">Назад</CButton>
    </div>
    <div class="gallery">
      <div
        v-for="(bag, idx) in baguettes"
        :key="bag"
        class="bagguete"
        :class="{ active: bag.article === frame.article }"
        @click="changeBagguete(idx)"
      >
        <div class="bagguete-image-div">
          <img
            :src="backendUrl + '/static/baguettes/' + bag.article + '.jpg'"
            alt="Baguette"
            class="bagguete-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";
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

function changeBagguete(idx) {
  props.frame.costBagguete = baguettes.value[idx].price;
  props.frame.wBaguette = baguettes.value[idx].wBaguette;
  props.frame.article = baguettes.value[idx].article;
}

onMounted(uploadingBagguet);
</script>

<style scoped>
.bagguete-config {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.bagguete-header {
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
.bagguete {
  width: 150px;
  height: 150px;
  background-color: white;
  padding: 8px;
  border: 4px solid white;
  border-radius: 4px;
}
.bagguete.active {
  border: 4px solid var(--main-color);
}
.bagguete-image-div {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
}
.bagguete-image {
  width: 100%;
  height: 100%;
  transform: translateY(35px) rotate(-45deg);
}
</style>
