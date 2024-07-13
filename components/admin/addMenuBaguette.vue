<template>
  <ErrorModal :body="errorText" :show="errorText != ''" @close="closeError" />
  <div class="over-div-add">
    <div class="menu-div">
      <h1 :style="{ color: 'var(--dark-grey-color)' }">Меню добавления</h1>
      <div v-for="(value, key) in headers" :key="key">
        <div v-if="value.type !== 0" class="block-menu-field">
          <h2 :style="{ color: 'var(--dark-grey-color)' }">
            {{ value.name }}
          </h2>

          <input
            v-if="value.type === 1"
            type="text"
            v-model="item[key]"
            maxlength="256"
          />
          <input v-if="value.type === 2" type="checkbox" v-model="item[key]" />
          <DropDown
            v-if="value.type === 8"
            v-model="item[key]"
            :options="options[0]"
          />
          <DropZone
            v-if="value.type === 4 || value.type === 5"
            v-model:modalFile="item[key]"
          />
        </div>
      </div>
      <div class="buttons-menu-add">
        <CButton :style="{ width: '110px' }" @click="tryMake"
          >Проверить</CButton
        >
        <CButton :style="{ width: '110px' }" @click="addItem">Добавить</CButton>
      </div>
    </div>
    <div class="over-div-preview">
      <div class="over-div-preview-size">
        <Preview :frame="item"></Preview>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CButton from "~/components/ui/cbutton.vue";
import DropZone from "../ui/dropZone.vue";
import DropDown from "../ui/dropDown.vue";
import ErrorModal from "~/components/errorModal.vue";
import Preview from "~/components/preview.vue";

const config = useRuntimeConfig();
const pathDefImage = config.public.pathDefImage;

const { $api } = useNuxtApp();

const item = ref({
  urlImage: pathDefImage,
  w: 80,
  h: 50,
  pattern1_path: "",
  pattern2_path: "",
  update: false,
  imageBaguette: "",
});

const props = defineProps({
  headers: { default: {} },
  options: { default: {} },
});
const emit = defineEmits(["addItem"]);

const errorText = ref("");

async function tryMake() {
  if (item.value.article == "") {
    errorText.value = "Укажите артикул";
    return;
  }
  if (item.value.width == 0) {
    errorText.value = "Укажите ширину багета";
    return;
  }
  if (item.value.imageBaguette == null) {
    errorText.value = "Загрузите изображение";
    return;
  }

  const formData = new FormData();
  formData.append("article", item.value.article);
  formData.append("width", Number(item.value.width));
  formData.append("image", item.value.image);
  try {
    const response = await $api.post("/api/v1/baguettes/preview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    item.value.update = !item.value.update;
    item.value.pattern1_path = "temp/" + item.value.article + "_0.jpg";
    item.value.pattern2_path = "temp/" + item.value.article + "_90.jpg";
  } catch (error) {
    console.error(error);
  }
}

function closeError() {
  errorText.value = "";
}

function addItem() {
  for (const key of Object.keys(props.headers)) {
    if (
      props.headers[key].type !== 0 &&
      (item.value[key] === "" || item.value[key] === -1)
    ) {
      errorText.value = `Возникла ошбика, так как поле \"${props.headers[key].name}\" не было заполнено`;
      return;
    }
  }

  emit("addItem", item.value);
}

function InitItem() {
  for (const key of Object.keys(props.headers)) {
    if (props.headers[key].type == 0) continue;
    item.value[key] = "";
    if ("default" in props.headers[key]) {
      item.value[key] = props.headers[key].default;
    }
  }
}

InitItem();
</script>

<style scoped>
.menu-div {
  width: 30%;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;

  min-width: 400px;
}
.block-menu-field {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
}
.menu-div input[type="text"] {
  width: 100%;
}

.buttons-menu-add {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.over-div-add {
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
}
.over-div-preview {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.over-div-preview-size {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
