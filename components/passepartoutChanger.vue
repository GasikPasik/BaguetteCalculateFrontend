<template>
  <galleryItems
    label="Выбрать багет"
    @back="emit('back')"
    :isEmpty="list_passepartout.length === 0"
  >
    <!-- <template v-for="i in 3"> -->
    <PassepartoutIcon
      v-for="(p, idx) in list_passepartout"
      :passepartout="p"
      @click="changePassepartout(idx)"
    />
    <!-- </template> -->
  </galleryItems>
</template>

<script setup>
import PassepartoutIcon from "~/components/passepartoutIcon.vue";
const { $api } = useNuxtApp();

const emit = defineEmits(["back"]);
const props = defineProps({
  frame: { require: true, type: Object },
  changeId: { default: 0, type: Number },
});

const list_passepartout = ref([]);
async function uploadingPass() {
  try {
    const response = await $api.get("/api/v1/passepartout/");
    list_passepartout.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

function changePassepartout(idx) {
  let cuffix = "_1";
  if (
    props.frame.pass_cuffix === 2 ||
    (props.frame.pass_cuffix !== 1 && props.frame.passId_1 !== -1)
  )
    cuffix = "_2";
  props.frame["passArtice" + cuffix] = list_passepartout.value[idx].article;
  props.frame["passCost" + cuffix] = list_passepartout.value[idx].price;
  props.frame["passId" + cuffix] = list_passepartout.value[idx].id;
  props.frame["passW" + cuffix] = list_passepartout.value[idx].width;
  props.frame["passH" + cuffix] = list_passepartout.value[idx].height;
  props.frame["passImage" + cuffix] = list_passepartout.value[idx].image_path;
}

onMounted(uploadingPass);
</script>
