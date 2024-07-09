<template>
  <div class="div-header">
    <div class="div-header-left">
      <div class="text-logo">Kodak</div>
      <div class="text-baget-calc">Багетный калькулятор</div>
    </div>
    <div class="div-header-right">
      <div class="username-div">
        <img class="ico-user" src="~/public/ico/user.svg" />
        {{ login }}
      </div>
      <div>
        <div class="burger-icon" @click="toggleBurger">
          <div v-for="index in 3" class="burger-icon-line" :key="index"></div>
        </div>
      </div>
    </div>
  </div>
  <Burger
    :isOpen="isOpenBurger"
    @close="toggleBurger"
    :adminTabs="adminTabs"
    :offerTabs="offerTabs"
  ></Burger>
</template>

<script setup>
import { ref } from "vue";
import Burger from "~/components/burger.vue";
const isOpenBurger = ref(false);
const { $api } = useNuxtApp();
const adminTabs = ref({});
const offerTabs = ref({});

const config = useRuntimeConfig();

function toggleBurger() {
  isOpenBurger.value = !isOpenBurger.value;
}

const login = ref("None");

async function fetchToken() {
  try {
    const response = await $api.get("/api/v1/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    login.value = response.data.login;
    if (response.data.tag == "admin") adminTabs.value = config.public.adminTabs;
    if (response.data.tag == "offer" || response.data.tag == "admin")
      offerTabs.value = config.public.offerTabs;
    localStorage.setItem("tag", response.data.tag);
  } catch (error) {
    localStorage.removeItem("token");
    login.value = "";
    adminTabs.value = {};
  }
}

onMounted(fetchToken);
</script>

<style scoped>
.div-header {
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: var(--dark-grey-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.div-header-left {
  display: flex;
  align-items: end;
  gap: 15px;
}

.text-logo {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: var(--main-color);
}
.text-baget-calc {
  color: white;
  font-weight: 500;
  font-size: 24px;
}

.burger-icon {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}
.burger-icon:hover .burger-icon-line {
  background-color: var(--main-color);
}
.burger-icon-line {
  height: 5px;
  width: 40px;
  background-color: white;
  transition: background-color 0.1s;
}
.username-div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  gap: 5px;
}
.div-header-right {
  display: flex;
  gap: 30px;
  color: white;
}
.ico-user {
  height: 20px;
}
</style>
