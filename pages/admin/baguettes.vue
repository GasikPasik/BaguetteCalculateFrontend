<template>
  <div class="main-div">
    <div class="header-button">
      <CButton @click="backToMenu">Назад в админ меню</CButton>
      <CButton v-if="isAdd" @click="changeMenu">Вернуться назад</CButton>
      <CButton v-else @click="changeMenu">Добавить новый</CButton>
    </div>
    <AddMenuBaguette
      v-if="isAdd"
      :headers="headers"
      @addItem="postBaguette"
      :materials="materials"
    />
    <CTable
      v-else
      :headers="headers"
      :data="data"
      @deleteItem="deleteBaguette"
      @updateItem="updateBaguette"
      mainName="article"
    ></CTable>
    <ErrorModal
      :body="errorText"
      :show="errorText !== ''"
      @close="closeError"
    />
  </div>
</template>
<script setup>
import AddMenuBaguette from "~/components/admin/addMenuBaguette.vue";
import CButton from "~/components/ui/cbutton.vue";
import CTable from "~/components/admin/ctable.vue";

import ErrorModal from "~/components/errorModal.vue";
import { createErrorMessage } from "~/utils/errorHandler.js";
const errorText = ref("");
function closeError() {
  errorText.value = "";
}

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

definePageMeta({
  middleware: [function (to, from) {}, "auth-admin"],
});
const { $api } = useNuxtApp();

const token = ref("");
const isAdd = ref(false);

const headers = {
  id: { name: "ID", type: 0 },
  preview: { name: "preview", type: 4 },
  article: { name: "Артикл", type: 1, isRequired: true },
  materials_id: { name: "Материал", type: 3, isRequired: true, default: -1 },
  width: { name: "Ширина", type: 1, isRequired: true },
  widthWQ: { name: "Ширина б.ч.", type: 1, isRequired: true },
  price: { name: "Цена", type: 1, isRequired: false, default: 0.0 },
  cell: { name: "Ячейка", type: 1, isRequired: false, default: "-" },
  stock: { name: "На складе", type: 1, isRequired: false, default: 0.0 },
};

const data = ref([]);
const materials = ref({});

function changeMenu() {
  isAdd.value = !isAdd.value;
}

async function deleteBaguette(idx) {
  const copyData = data.value[idx];
  const id = data.value[idx].id;
  try {
    data.value = data.value.filter((obj) => obj.id !== id);
    const response = await $api.delete(`/api/v1/baguettes/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    data.value.splice(idx, 0, copyData);
    errorText.value = createErrorMessage(error);
  }
}

async function updateBaguette(idx, newBaguette) {
  try {
    const response = await $api.put(
      `/api/v1/baguettes/${newBaguette.id}/`,
      newBaguette,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const resp = await response.data;
    data.value[idx] = resp;
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function postBaguette(newBaguette) {
  const formData = new FormData();
  formData.append("article", newBaguette.value.article);
  formData.append("materials_id", newBaguette.value.materials_id);
  formData.append("width", Number(newBaguette.value.width));
  formData.append("widthWQ", Number(newBaguette.value.widthWQ));
  formData.append("price", Number(newBaguette.value.price));
  formData.append("cell", newBaguette.value.cell);
  formData.append("stock", Number(newBaguette.value.stock));
  formData.append("imageBaguette", newBaguette.value.imageBaguette);

  try {
    const response = await $api.post(
      "http://localhost:8000/api/v1/baguettes/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const resp = await response.data;
    resp.preview = backendUrl + "/baguettes/" + resp.article + ".jpg";
    data.value.push(resp);
    changeMenu();
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function getBaguettes() {
  try {
    const response = await $api.get("/api/v1/baguettes/");
    data.value = response.data;
  } catch (error) {
    data.value = [];
    errorText.value = createErrorMessage(error);
  }
}

async function getMaterials() {
  try {
    const response = await $api.get("/api/v1/materials/");
    materials.value = response.data;
  } catch (error) {
    data.value = [];
    errorText.value = createErrorMessage(error);
  }
}
const router = useRouter();
function backToMenu() {
  router.push("/admin/");
}

onMounted(() => {
  token.value = localStorage.getItem("token");
  getBaguettes();
  getMaterials();
});
</script>

<style scoped>
.main-div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  overflow: hidden;
}

.header-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
