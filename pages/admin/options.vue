<template>
  <div class="main-div">
    <div class="header-button">
      <CButton @click="backToMenu">Назад в админ меню</CButton>
      <AddMenuModal :headers="headers" @addItem="postOption" />
    </div>
    <CTable
      :headers="headers"
      :data="data"
      @deleteItem="deleteOption"
      @updateItem="updateOption"
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
  isDependsSize: {
    name: "Зависит от размера",
    type: 2,
    isRequired: false,
    default: false,
  },
};

const data = ref([]);
const errorText = ref("");
function closeError() {
  errorText.value = "";
}

async function deleteOption(idx) {
  const copyData = data.value[idx];
  const id = data.value[idx].id;
  try {
    data.value = data.value.filter((obj) => obj.id !== id);
    const response = await $api.delete(`/api/v1/options/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    data.value.splice(idx, 0, copyData);
    errorText.value = createErrorMessage(error);
  }
}

async function updateOption(idx, newOption) {
  try {
    const response = await $api.put(
      `/api/v1/options/${newOption.id}`,
      newOption,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const resp = await response.data;
    data.value[idx] = resp;
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

async function postOption(newOption) {
  try {
    const response = await $api.post("/api/v1/options/", newOption, {
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

async function getOption() {
  try {
    const response = await $api.get("/api/v1/options/");
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
  getOption();
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
