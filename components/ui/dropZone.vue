<template>
  <div
    class="drop-area"
    @dragover.prevent
    @drop="handleDrop"
    @click="handleClick"
    v-if="!internalImageUrl"
  >
    <p v-if="!internalImageUrl">Перетащите фотографию или нажмите сюда</p>
    <img v-else :src="internalImageUrl" alt="Uploaded Image" />
  </div>
  <CButton
    :style="{ width: '100%' }"
    v-if="internalImageUrl"
    @click="deleteImage"
  >
    Загрузить другую фотографию
  </CButton>
</template>

<script setup>
import { ref, watch } from "vue";
import CButton from "~/components/ui/cbutton.vue";

const props = defineProps({
  modalUrl: {
    default: "",
  },
  modalFile: {
    default: null,
  },
});
const emit = defineEmits(["update:modalUrl", "update:modalFile"]);

const internalImageUrl = ref(props.modalUrl);
const internalImageFile = ref(props.modalFile);

watch(
  () => props.modalUrl,
  (newValue) => {
    internalImageUrl.value = newValue;
  }
);

watch(
  () => props.modalFile,
  (newValue) => {
    internalImageFile.value = newValue;
  }
);

const updateImage = (file) => {
  if (file && file.type.startsWith("image/")) {
    internalImageUrl.value = URL.createObjectURL(file);
    internalImageFile.value = file;
    emit("update:modalUrl", internalImageUrl.value);
    emit("update:modalFile", internalImageFile.value);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  updateImage(file);
};

const handleClick = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (event) => {
    const file = event.target.files[0];
    updateImage(file);
  };
  input.click();
};

const deleteImage = () => {
  internalImageUrl.value = "";
  internalImageFile.value = null;
  emit("update:modalUrl", "");
  emit("update:modalFile", null);
};
</script>

<style>
.drop-area {
  position: relative;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: rgb(235, 235, 235);
  border-radius: 0px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 80px;
  font-weight: 800;
  -webkit-box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.2),
    0px 0px 15px 6px rgba(0, 0, 0, 0.2) inset;
}
.drop-area:before {
  content: "";
  position: absolute;
  border: 5px dashed var(--dark-grey-color);
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
}

.drop-area img {
  max-width: 100%;
  max-height: 300px;
}
</style>
