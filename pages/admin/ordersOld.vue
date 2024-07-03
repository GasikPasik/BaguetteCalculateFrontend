<template>
  <div class="main-div">
    <div class="header-button">
      <CButton @click="backToMenu">Назад в админ меню</CButton>
      <AddMenuModal :headers="headers" @addItem="postOffer" />
    </div>
    <CTable
      :headers="headers"
      :data="data"
      @deleteItem="deleteOffer"
      @updateItem="updateOffer"
      mainName="offername"
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

const headers = {
  id: { name: "ID", type: 0 },
  offername: { name: "Логин", type: 1, isRequired: true },
  password: { name: "Пароль", type: 1, isRequired: true },
};

const data = ref([]);

async function deleteOffer(idx) {
  const copyData = data.value[idx];
  const id = data.value[idx].id;
  try {
    data.value = data.value.filter((obj) => obj.id !== id);
    const response = await $api.delete(`/api/v1/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    data.value.splice(idx, 0, copyData);
    errorText.value = createErrorMessage(error);
  }
}

async function updateOffer(idx, newOffer) {
  try {
    const response = await $api.put(`/api/v1/offers/${newOffer.id}`, newOffer, {
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

async function postOffer(newOffer) {
  try {
    const response = await $api.post("/api/v1/offers/", newOffer, {
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

async function getOffers() {
  try {
    const response = await $api.get("/api/v1/offers/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    data.value = response.data;
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
  getOffers();
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
