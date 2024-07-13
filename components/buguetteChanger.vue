<template>
  <galleryItems
    label="Выбрать багет"
    @back="emit('back')"
    :isEmpty="baguettes.length === 0"
  >
    <!-- <template v-for="i in 3"> -->
    <BaguetteIcon
      v-for="(bag, idx) in baguettes"
      :baguette="{
        id: bag.id,
        article: bag.article,
        price: bag.price,
        width: bag.width,
        widthWQ: bag.widthWQ,
        image: bag.image_path,
      }"
      :key="bag"
      :active="bag.article === frame.article"
      @click="changeBaguette(idx)"
    />
    <!-- </template> -->
  </galleryItems>
</template>

<script setup>
import galleryItems from "~/components/galleryItems.vue";
const { $api } = useNuxtApp();

const emit = defineEmits(["back"]);
const props = defineProps({ frame: { require: true } });

const baguettes = ref([]);
async function uploadingBagguet() {
  try {
    const response = await $api.get("/api/v1/baguettes/price");
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
