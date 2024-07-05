<template>
  <ItemIcon
    :active="active"
    :label="baguette.article"
    :price="baguette.price"
    :info="{
      id: baguette.id,
      Артикул: baguette.article,
      'Цена за метр': baguette.price,
      Ширина: baguette.width,
      'Ширина без четверти': baguette.widthWQ,
    }"
  >
    <img
      :src="backendUrl + '/static/' + baguette.image"
      alt="Baguette"
      class="bagguete-image"
    />
  </ItemIcon>
</template>

<script setup>
import ItemIcon from "~/components/ui/itemIcon.vue";

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;
const props = defineProps({
  baguette: { require: true, type: Object },
  active: { default: false },
});
</script>

<style scoped>
.bagguete-image {
  width: 100%;
  height: 100%;
  transform: translateY(35px) rotate(-45deg);
}
</style>
