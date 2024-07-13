<template>
  <AdminPage
    :headers="offer"
    apiPath="/api/v1/offers/"
    mainFieldName="offername"
  />
</template>

<script setup>
import AdminPage from "~/components/admin/adminPage";

const offer = {
  id: { name: "ID", type: 0 },
  offername: { name: "Логин", type: 1 },
  password: { name: "Пароль", type: 1 },
};
</script>

<style scoped></style>
