<template>
  <div class="main-div-autho">
    <div class="div-autho">
      <h1>Авторизация</h1>
      <div class="block-autho">
        <h2>Логин</h2>
        <input v-model="offername" maxlength="24" />
      </div>
      <div class="block-autho">
        <h2>Пароль</h2>
        <input v-model="password" :type="showPassword ? 'text' : 'password'" />
        <div class="button-show-visiable">
          <button @click="toggleShowPassword">
            {{ showPassword ? "Скрыть пароль" : "Просмотреть пароль" }}
          </button>
        </div>
      </div>
      <p class="div-error">{{ error }}</p>

      <CButton @click="tryAuthorization">Готово</CButton>
    </div>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";
import { useRouter } from "vue-router";
const { $api } = useNuxtApp();

const offername = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);

const router = useRouter();

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

async function tryAuthorization() {
  const formData = new FormData();
  formData.append("offername", offername.value);
  formData.append("password", password.value);
  try {
    error.value = "";
    const response = await $api.post("/api/v1/login/offer/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    localStorage.setItem("token", response.data.token);
    router.push("/admin/").then(() => {
      location.reload();
    });
  } catch (e) {
    console.error("Ошибка при авторизации:", e);
    error.value = "Неверный логин или пароль";
    console.log(error.value);
  }
}
</script>

<style scoped>
.main-div-autho {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.div-autho {
  min-width: 200px;
  min-height: 200px;
  background-color: var(--dark-grey-color);
  text-align: center;
  padding: 35px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  outline: none;
  border: none;
  padding: 2px 8px;
  font-family: "Inter", sans-serif;
}

.block-autho {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
}

.div-error {
  text-align: center;
  color: var(--red-color);
}
.button-show-visiable {
  width: 100%;
  text-align: end;
}
.button-show-visiable button {
  background: none;
  outline: none;
  border: none;
  color: white;
  opacity: 70%;
  font-size: 14px;
}
.button-show-visiable button:hover {
  color: var(--main-color);
}
</style>
