<template>
  <div class="main-div">
    <div class="header-button">
      <CButton @click="backToMenu">Назад в админ меню</CButton>
      <AddMenuModal :headers="headers" @addItem="postGlass" />
    </div>
    <CTable
      :headers="headers"
      :data="data"
      @deleteItem="deleteGlass"
      @updateItem="updateGlass"
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
import ErrorModal from "~/components/errorModal.vue";
import CTable from "~/components/admin/ctable.vue";
import { createErrorMessage } from "~/utils/errorHandler.js";

definePageMeta({
  middleware: [function (to, from) {}, "auth-admin"],
});

const { $api } = useNuxtApp();
const token = ref("");
const headers = {
  id: { name: "ID", type: 0 },
  title: { name: "Название", type: 1, isRequired: true },
  description: { name: "Описание", type: 1, isRequired: true },
  price: { name: "Цена", type: 1, isRequired: true },
};

const data = ref([]);
const errorText = ref("");
function closeError() {
  errorText.value = "";
}

async function deleteGlass(idx) {
  const copyData = data.value[idx];
  const id = data.value[idx].id;
  try {
    data.value = data.value.filter((obj) => obj.id !== id);
    const response = await $api.delete(`/api/v1/glass/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    data.value.splice(idx, 0, copyData);
    errorText.value = createErrorMessage(error);
  }
}

async function updateGlass(idx, newGlass) {
  try {
    const response = await $api.put(`/api/v1/glass/${newGlass.id}`, newGlass, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const resp = await response.data;
    data.value[idx] = resp;
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function postGlass(newGlass) {
  try {
    const response = await $api.post("/api/v1/glass/", newGlass, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const resp = await response.data;
    data.value.push(resp);
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function getGlass() {
  try {
    const response = await $api.get("/api/v1/glass/");
    data.value = response.data;
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
  getGlass();
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
