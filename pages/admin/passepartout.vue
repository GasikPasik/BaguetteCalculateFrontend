<template>
  <AdminPage
    :headers="passepartout"
    apiPath="/api/v1/passepartout/"
    mainFieldName="article"
  />
</template>

<script setup>
import AdminPage from "~/components/admin/adminPage";
const passepartout = {
  id: { name: "ID", type: 0 },
  image_path: { name: "Узор", type: 6 },
  article: { name: "Артикл", type: 1 },
  width: { name: "Ширина", type: 1 },
  height: { name: "Высота", type: 1 },
  price: { name: "Цена", type: 1, default: 0.0 },
};
</script>

<style scoped></style>
