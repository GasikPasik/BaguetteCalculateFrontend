<template>
  <ItemIcon
    :label="passepartout.article"
    :price="passepartout.price === '' ? '' : passepartout.price + ' руб.кв.м.'"
  >
    <img
      class="image-pass"
      :src="backendUrl + '/static/' + passepartout.image_path"
    />
  </ItemIcon>
</template>

<script setup>
import ItemIcon from "~/components/ui/itemIcon.vue";
const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const props = defineProps({
  passepartout: { require: true, type: Object },
});
</script>

<style scoped>
.image-pass {
  max-width: 100%;
  max-height: 100%;
}
</style>
