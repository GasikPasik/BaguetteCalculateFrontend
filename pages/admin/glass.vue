<template>
  <AdminPage :headers="glass" apiPath="/api/v1/glass" mainFieldName="title" />
</template>

<script setup>
import AdminPage from "~/components/admin/adminPage";

const glass = {
  id: { name: "ID", type: 0 },
  title: { name: "Название", type: 1 },
  description: { name: "Описание", type: 1 },
  price: { name: "Цена", type: 1, default: 0.0 },
};
</script>

<style scoped></style>
