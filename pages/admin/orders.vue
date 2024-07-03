<template>
  <AdminPage
    :headers="option"
    apiPath="/api/v1/options"
    mainFieldName="title"
  />
</template>

<script setup>
import AdminPage from "~/components/admin/adminPage";

const option = {
  id: { name: "ID", type: 0 },
  title: { name: "Название", type: 1 },
  description: { name: "Описание", type: 1 },
  price: { name: "Цена", type: 1 },
  isDependsSize: {
    name: "Зависит от размера",
    type: 2,
    default: false,
  },
};
</script>

<style scoped></style>
