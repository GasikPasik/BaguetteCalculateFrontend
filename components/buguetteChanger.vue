<template>
  <div class="baguette-config">
    <h1>Выбрать багет</h1>
    <div class="baguette-header">
      <div>Ну тут будут фильтры</div>
      <CButton @click="emit('back')">Назад</CButton>
    </div>
    <div class="gallery" v-if="baguettes.length > 0">
      <BaguetteIcon
        :baguette="{
          id: bag.id,
          article: bag.article,
          price: bag.price,
          width: bag.width,
          widthWQ: bag.widthWQ,
          image: bag.image_path,
        }"
        v-for="(bag, idx) in baguettes"
        :key="bag"
        :active="bag.article === frame.article"
        @click="changeBaguette(idx)"
      />
    </div>
    <p v-else :style="{ color: 'white', opacity: '60%' }">
      Загружаем ассортимент...
    </p>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";
import BaguetteIcon from "~/components/baguetteIcon.vue";
const { $api } = useNuxtApp();

const emit = defineEmits(["back"]);
const props = defineProps({ frame: { require: true } });

const baguettes = ref([]);
async function uploadingBagguet() {
  try {
    const response = await $api.get("/api/v1/baguettes/price/");
    baguettes.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

function changeBaguette(idx) {
  props.frame.baguetteCost = baguettes.value[idx].price;
  props.frame.width = baguettes.value[idx].width;
  props.frame.widthWQ = baguettes.value[idx].widthWQ;
  props.frame.article = baguettes.value[idx].article;
  props.frame.baguetteId = baguettes.value[idx].id;
  props.frame.pattern1_path = baguettes.value[idx].pattern1_path;
  props.frame.pattern2_path = baguettes.value[idx].pattern2_path;
  props.frame.stock = baguettes.value[idx].stock;
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
  justify-content: end;
  align-items: start;
  gap: 10px;
  overflow-y: scroll;
}
</style>
