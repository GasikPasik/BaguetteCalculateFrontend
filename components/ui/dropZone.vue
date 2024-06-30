<template>
  <div
    class="drop-area"
    @dragover.prevent
    @drop="handleDrop"
    @click="handleClick"
    v-if="!imageUrl"
  >
    <p v-if="!imageUrl">Перетащите фотографию или нажмите сюда</p>
    <img v-else :src="imageUrl" alt="Uploaded Image" />
  </div>
  <CButton :style="{ width: '100%' }" v-if="imageUrl" @click="deleteImage"
    >Загрузить другую фотографию</CButton
  >
</template>

<script setup>
import { ref } from "vue";
import CButton from "~/components/ui/cbutton.vue";

const imageUrl = ref("");
const emit = defineEmits(["uploadImage"]);

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file && file.type.startswith("image/")) {
    imageUrl.value = URL.createObjectURL(file);
    emit("uploadImage", file);
  }
};

const handleClick = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      imageUrl.value = URL.createObjectURL(file);
      emit("uploadImage", file);
    }
  };
  input.click();
};

const deleteImage = () => {
  imageUrl.value = "";
  emit("uploadImage", "");
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
