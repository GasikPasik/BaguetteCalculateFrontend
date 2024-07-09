<template>
  <AdminPage
    :headers="passepartout"
    apiPath="/api/v1/baguettes/"
    mainFieldName="article"
  />
</template>

<script setup>
import AdminPage from "~/components/admin/adminPage";
const passepartout = {
  id: { name: "ID", type: 0 },
  image: { name: "Узор", type: 4 },
  article: { name: "Артикл", type: 1 },
  materials_id: { name: "Материал", type: 8, default: -1 },
};
</script>

<style scoped></style>
