<template>
  <div class="main-div">
    <div class="header-button">
      <CButton @click="backToMenu">Назад в админ меню</CButton>
      <AddMenuModal :headers="headers" @addItem="postPoint" />
    </div>
    {{ data.value }}
    <CTable
      :headers="headers"
      :data="data"
      @deleteItem="deletePoint"
      @updateItem="updatePoint"
      mainName="title"
    ></CTable>
    <ErrorModal
      :body="errorText"
      :show="errorText !== ''"
      @close="closeError"
    />
  </div>
</template>
<script setup>
import CButton from "~/components/ui/cbutton.vue";
import AddMenuModal from "~/components/admin/addMenuModal.vue";
import CTable from "~/components/admin/ctable.vue";
import ErrorModal from "~/components/errorModal.vue";
import { createErrorMessage } from "~/utils/errorHandler.js";
const errorText = ref("");
function closeError() {
  errorText.value = "";
}
definePageMeta({
  middleware: [function (to, from) {}, "auth-admin"],
});
const { $api } = useNuxtApp();
const token = ref("");

const config = useRuntimeConfig();
const headers = {
  id: { name: "ID", type: 0 },
  image: { name: "Превью точки", type: 5, isRequired: true },
  title: { name: "Адрес", type: 1, isRequired: true },
  x: { name: "Широта", type: 1, isRequired: true },
  y: { name: "Долгота", type: 1, isRequired: true },
};

const data = ref([]);

async function deletePoint(idx) {
  const copyData = data.value[idx];
  const id = data.value[idx].id;
  try {
    data.value = data.value.filter((obj) => obj.id !== id);
    const response = await $api.delete(`/api/v1/points/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    data.value.splice(idx, 0, copyData);
    errorText.value = createErrorMessage(error);
  }
}

async function updatePoint(idx, newPoint) {
  try {
    const response = await $api.put(`/api/v1/points/${newPoint.id}`, newPoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    data.value[idx] = newPoint;
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function postPoint(newPoint) {
  const formData = new FormData();
  formData.append("x", newPoint.x);
  formData.append("y", newPoint.y);
  formData.append("preview", newPoint.image);
  formData.append("title", newPoint.title);
  try {
    console.log(newPoint);
    const response = await $api.post("/api/v1/points/", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const resp = await response.data;
    resp.image = `${config.public.backendUrl}/static/preview/${resp.id}.jpg`;
    console.log(resp);
    data.value.push(resp);
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function getPoint() {
  try {
    const response = await $api.get("/api/v1/points/");
    console.log(response.data);
    data.value = response.data.map((obj) => ({
      ...obj,
      image: `${config.public.backendUrl}/static/preview/${obj.id}.jpg`,
    }));
    console.log(data.value);
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
  getPoint();
});
</script>

<style scoped>
.main-div {
  width: 100%;
  overflow: hidden;
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
