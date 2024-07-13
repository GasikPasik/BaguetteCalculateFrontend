<template>
  <AdminPage
    :headers="baguette"
    apiPath="/api/v1/baguettes/"
    mainFieldName="article"
    :isBaguette="true"
    :options="[materials]"
  />
</template>

<script setup>
import AdminPage from "~/components/admin/adminPage";

const { $api } = useNuxtApp();
const materials = ref([]);
async function getMaterials() {
  try {
    const response = await $api.get("/api/v1/materials/");
    materials.value = response.data;
  } catch (error) {
    errorText.value = createErrorMessage(error);
  }
}

const baguette = {
  id: { name: "ID", type: 0 },
  image: { name: "Узор", type: 4 },
  article: { name: "Артикл", type: 1 },
  materials_id: { name: "Материал", type: 8, default: -1 },
  width: { name: "Ширина", type: 1 },
  widthWQ: { name: "Ширина б.ч.", type: 1, isRequired: true },
  price: { name: "Цена", type: 1, default: 0.0 },
  cell: { name: "Ячейка", type: 1, default: "-" },
  stock: { name: "На складе", type: 1, default: 0.0 },
};

onMounted(() => {
  getMaterials();
});
</script>

<style scoped></style>
