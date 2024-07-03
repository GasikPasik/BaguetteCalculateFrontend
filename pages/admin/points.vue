<template>
  <AdminPage :headers="point" apiPath="/api/v1/points" mainFieldName="title" />
</template>

<script setup>
import AdminPage from "~/components/admin/adminPage";

const point = {
  id: { name: "ID", type: 0 },
  image: { name: "Превью точки", type: 5 },
  title: { name: "Адрес", type: 1 },
  x: { name: "Широта", type: 1 },
  y: { name: "Долгота", type: 1 },
};
</script>

<style scoped></style>
