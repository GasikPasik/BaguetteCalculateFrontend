<template>
  <div
    class="drop-area"
    @dragover.prevent
    @drop="handleDrop"
    @click="handleClick"
  >
    <p v-if="!imageUrl">Перетащите фотографию или нажмите сюда</p>
    <img v-else :src="imageUrl" alt="Uploaded Image" />
  </div>
  <button v-if="imageUrl" @click="deleteImage">Удалить фотографию</button>
</template>

<script setup>
import { ref } from "vue";

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
  background-color: white;
  border-radius: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  -webkit-box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 16px 6px rgba(0, 0, 0, 0.3),
    0px 0px 15px 6px rgba(0, 0, 0, 0.3) inset;
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
