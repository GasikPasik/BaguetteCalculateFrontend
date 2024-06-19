<template>
  <div class="main-div">
    <div class="header-button">
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
  </div>
</template>
<script setup>
import AddMenuBaguette from "~/components/admin/addMenuBaguette.vue";
import CButton from "~/components/ui/cbutton.vue";
import CTable from "~/components/admin/ctable.vue";

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
  // try {
  //   const id = data.value[idx].id;
  //   data.value = data.value.filter((obj) => obj.id !== id);
  //   const response = await $api.delete(`/api/v1/offers/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
}

async function updateBaguette(idx, newBaguette) {
  // try {
  //   console.log("id: ", newBaguette.id);
  //   const response = await $api.put(
  //     `/api/v1/offers/${newBaguette.id}`,
  //     newBaguette,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   const resp = await response.data;
  //   data.value[idx] = resp;
  // } catch (error) {
  //   console.error(error);
  // }
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
    console.error("Error adding new option:", error);
  }
}

async function getBaguettes() {
  try {
    const response = await $api.get("/api/v1/baguettes/");
    data.value = response.data;
  } catch (error) {
    data.value = [];
    console.error(error);
  }
}

async function getMaterials() {
  try {
    const response = await $api.get("/api/v1/materials/");
    materials.value = response.data;
  } catch (error) {
    data.value = [];
    console.error(error);
  }
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
  justify-content: end;
}
</style>
