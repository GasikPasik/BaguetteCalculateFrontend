<template>
  <Authorization v-if="token === '' || tag === ''"></Authorization>
  <div v-else class="block-admin">
    <h1 class="color-grey">Админ меню</h1>
    <div class="tabs-div">
      <div v-if="tag === 'admin'">
        <h1>Панель админа</h1>
        <p
          class="tab"
          v-for="i in Object.keys(adminTabs)"
          @click="navigateTo('/admin/' + i + '/')"
        >
          {{ adminTabs[i] }}
        </p>
      </div>
      <div>
        <h1>Панель сотрудника</h1>
        <p
          class="tab"
          v-for="i in Object.keys(offerTabs)"
          @click="navigateTo('/admin/' + i + '/')"
        >
          {{ offerTabs[i] }}
        </p>
      </div>
    </div>
    <CButton :style="{ width: '200px' }" @click="logout"
      >Выйти из аккаунта</CButton
    >
  </div>
</template>

<script setup>
import Authorization from "~/components/authorization.vue";
import CButton from "~/components/ui/cbutton.vue";

const router = useRouter();

const config = useRuntimeConfig();

const adminTabs = config.public.adminTabs;
const offerTabs = config.public.offerTabs;

const token = ref("");
const tag = ref("");
function checkToken() {
  const checkToken = localStorage.getItem("token");
  if (checkToken) {
    token.value = checkToken;
    tag.value = localStorage.getItem("tag");
  } else {
    token.value = "";
    tag.value = "";
  }
}

function logout() {
  console.log(12);
  token.value = localStorage.removeItem("token");
  router.push("/admin/").then(() => {
    location.reload();
  });
}

function navigateTo(path) {
  router.push(path);
}

onMounted(checkToken);
</script>

<style scoped>
.block-admin {
  width: 100%;
  height: 100%;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
}

.color-grey {
  color: var(--dark-dark-grey-color);
}
.tab {
  color: white;
  transition: transform 0.1s ease-in-out;
  cursor: pointer;
}

.tab:hover {
  transform: scale(110%);
  color: var(--main-color);
}

.tab:active {
  transform: scale(130%);
  color: var(--main-color);
}
.tabs-div {
  display: flex;
  flex-direction: column;
  gap: 20px;

  background-color: var(--dark-grey-color);
  padding: 30px;

  border-radius: 10px;
}
</style>
