<template>
  <div class="main-div">
    <div class="header-button">
      <CButton @click="backToMenu">Назад в админ меню</CButton>
      <AddMenuModal
        v-if="!isBaguette"
        :headers="headers"
        @addItem="handleAddItem"
      />
      <CButton v-if="isBaguette && isAdd" @click="changeMenu"
        >Вернуться назад</CButton
      >
      <CButton v-if="isBaguette && !isAdd" @click="changeMenu"
        >Добавить новый</CButton
      >
    </div>
    <AddMenuBaguette
      v-if="isBaguette && isAdd"
      :headers="headers"
      @addItem="handleAddItem"
      :options="options"
    />
    <CTable
      v-else
      :headers="headers"
      :data="data"
      :localData="localData"
      @deleteItem="handleDeleteItem"
      @updateItem="handleUpdateItem"
      :mainFieldName="mainFieldName"
      :options="options"
    ></CTable>
    <ErrorModal
      :body="errorText"
      :show="errorText !== ''"
      @close="closeError"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useNuxtApp } from "nuxt/app";
import CButton from "~/components/ui/cbutton.vue";
import AddMenuModal from "~/components/admin/addMenuModal.vue";
import AddMenuBaguette from "~/components/admin/addMenuBaguette.vue";
import CTable from "~/components/admin/ctable.vue";
import ErrorModal from "~/components/errorModal.vue";
import { createErrorMessage } from "~/utils/errorHandler.js";

const isAdd = ref(false);
function changeMenu() {
  isAdd.value = !isAdd.value;
}

const props = defineProps({
  headers: Object,
  apiPath: String,
  mainFieldName: String,
  isBaguette: { default: false },
  options: { default: {} },
});

const errorText = ref("");

const data = ref([]);
const localData = ref([]);

const { $api } = useNuxtApp();

function closeError() {
  errorText.value = "";
}

async function handleDeleteItem(idx) {
  const copyData = data.value[idx];
  const id = data.value[idx].id;
  try {
    data.value = data.value.filter((obj) => obj.id !== id);
    localData.value = localData.value.filter((obj) => obj.id !== id);
    await $api.delete(`${props.apiPath}${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    data.value.splice(idx, 0, copyData);
    localData.value.splice(idx, 0, copyData);
    errorText.value = createErrorMessage(error);
  }
}

async function handleUpdateItem(idx) {
  try {
    console.log(localData.value[idx]);
    const response = await $api.put(
      `${props.apiPath}${localData.value[idx].id}`,
      localData.value[idx],
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const resp = await response.data;
    data.value[idx] = resp;
    localData.value[idx] = JSON.parse(JSON.stringify(resp));
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function handleAddItem(newItem) {
  console.log(newItem);
  const formData = new FormData();

  for (const key in props.headers) {
    formData.append(key, newItem[key]);
  }

  try {
    const response = await $api.post(props.apiPath, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const resp = await response.data;
    data.value.push(resp);
    localData.value.push(JSON.parse(JSON.stringify(resp)));
    isAdd.value = false;
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}
const router = useRouter();
function backToMenu() {
  router.push("/admin/");
}

async function fetchData() {
  try {
    if (localStorage.getItem("token") === null) router.push("/admin/");
    const response = await $api.get(props.apiPath, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    data.value = response.data;
    console.log("data:", data.value);
    localData.value = JSON.parse(JSON.stringify(data.value));
  } catch (error) {
    errorText.value = createErrorMessage(error);
    data.value = [];
    localData.value = [];
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.main-div {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
}

.header-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
