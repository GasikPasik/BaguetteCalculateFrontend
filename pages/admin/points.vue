<template>
  <div class="main-div">
    <div class="header-button">
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
  </div>
</template>
<script setup>
import AddMenuModal from "~/components/admin/addMenuModal.vue";
import CTable from "~/components/admin/ctable.vue";
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
  try {
    const id = data.value[idx].id;
    data.value = data.value.filter((obj) => obj.id !== id);
    const response = await $api.delete(`/api/v1/points/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error("Error adding new point:", error);
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
    data.value = {};
    console.error(error);
  }
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
  justify-content: end;
}
</style>
