<template>
  <div>
    <ErrorModal :body="errorText" :show="isError" @close="closeError" />
    <CButton @click="openMenu">Добавить</CButton>
    <div v-if="isOpen" class="bg-menu-div" @pointerdown="handleOutsideClick">
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
            <input
              v-if="value.type === 2"
              type="checkbox"
              v-model="item[key]"
            />
            <DropZone
              v-if="value.type === 4 || value.type === 5"
              @uploadImage="uploadImage"
            />
          </div>
        </div>

        <div class="buttons-menu-add">
          <CButton :style="{ width: '110px' }" @click="openMenu"
            >Отмена</CButton
          >
          <CButton :style="{ width: '110px' }" @click="addItem"
            >Добавить</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CButton from "~/components/ui/cbutton.vue";
import ErrorModal from "~/components/errorModal.vue";
import DropZone from "../ui/dropZone.vue";

const isOpen = ref(false);
const item = ref({});

const props = defineProps({ headers: { default: {} } });
const emit = defineEmits(["addItem"]);

const isError = ref(false);
const errorText = ref("");

const config = useRuntimeConfig();
const pathDefImage = config.public.pathDefImage;

function uploadImage(file) {
  item.value.image = file;
}

function openMenu() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) InitItem();
}
function closeError() {
  isError.value = false;
}

function addItem() {
  for (const key of Object.keys(props.headers)) {
    if (props.headers[key].isRequired && item.value[key] === "") {
      isError.value = true;
      errorText.value = `Возникла ошбика, так как поле \"${props.headers[key].name}\" не было заполнено`;
      return;
    }
  }
  emit("addItem", item.value);
  openMenu();
}

function handleOutsideClick(event) {
  const menuDiv = event.target.closest(".menu-div");
  if (!menuDiv) {
    isOpen.value = false;
  }
}

function InitItem() {
  for (const key of Object.keys(props.headers)) {
    if (props.headers[key].type == 0) continue;
    item.value[key] = "";
    if (!props.headers[key].isRequired) {
      item.value[key] = props.headers[key].default;
    }
  }
}

InitItem();
</script>

<style scoped>
.bg-menu-div {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.menu-div {
  min-width: 200px;
  min-height: 200px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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

input[type="text"] {
  border: 2px solid var(--dark-grey-color);
}

.buttons-menu-add {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
