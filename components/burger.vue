<template>
  <div class="burger-bg" @click="closeMenu" v-if="isOpen"></div>
  <div
    class="over-div-burger"
    :class="{
      'over-div-burger-open': isOpen,
      'over-div-burger-close': !isOpen,
    }"
    @click.stop
  >
    <div
      :class="[
        'burger-div',
        { 'burger-div-open': isOpen, 'burger-div-close': !isOpen },
      ]"
    >
      <div class="close-div">
        <svg
          class="button-close"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 94.926 94.926"
          xml:space="preserve"
          @click="closeMenu"
        >
          <g>
            <path
              d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"
            ></path>
          </g>
        </svg>
      </div>
      <div class="into-burger-div">
        <div class="burger-block">
          <h1>Меню</h1>
          <div class="div-tabs">
            <p
              v-for="(tab, idx) in Object.keys(tabs)"
              :key="idx"
              @click="navigateTo(tabs[tab])"
            >
              {{ tab }}
            </p>
            <p
              v-if="Object.keys(offerTabs).length > 0"
              @click="navigateTo('/admin/')"
            >
              Админ панель
            </p>
          </div>
        </div>

        <div v-if="Object.keys(offerTabs).length" class="burger-block">
          <h1>Меню сотрудника</h1>
          <div class="div-tabs">
            <p
              v-for="(tab, idx) in Object.keys(offerTabs)"
              :key="idx"
              @click="navigateTo('/admin/' + tab + '/')"
            >
              {{ offerTabs[tab] }}
            </p>
          </div>
        </div>

        <div v-if="Object.keys(adminTabs).length" class="burger-block">
          <h1>Меню админа</h1>
          <div class="div-tabs">
            <p
              v-for="(tab, idx) in Object.keys(adminTabs)"
              :key="idx"
              @click="navigateTo('/admin/' + tab + '/')"
            >
              {{ adminTabs[tab] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  isOpen: { default: false },
  adminTabs: { default: {} },
  offerTabs: { default: {} },
});

const emit = defineEmits(["close"]);

let tabs = { "Конструктор рамок": "/", "О нас": "/about/" };
const router = useRouter();

function closeMenu() {
  if (props.isOpen) emit("close");
}

function navigateTo(path) {
  router.push(path);
  emit("close");
}
</script>

<style scoped>
.burger-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
}
.over-div-burger {
  position: fixed;
  top: 0;
  right: 0;
  overflow: hidden;
  width: 35%;
  min-width: 500px;
  max-width: 600px;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  z-index: 100;
}

@media screen and (max-width: 800px) {
  .over-div-burger {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
  }
}

.burger-div {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: var(--dark-grey-color);
  opacity: 97%;
  transition: transform 0.3s ease-in-out;

  padding: 15px;
  color: white;
  box-shadow: 0px 0px 50px 15px rgba(10, 10, 10, 0.3) inset;
}

p {
  border-bottom: 2px solid rgba(240, 240, 240, 0.3);
  transition: border-color 0.2s ease-in-out;
  transition: padding-right 0.2s ease-in-out;
  cursor: pointer;
}
p:hover {
  padding-right: 10px;
  border-bottom: 2px solid var(--main-color);
}
.div-tabs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.over-div-burger-open {
  transform: translateX(0);
}
.over-div-burger-close {
  transform: translateX(100%);
}
h1 {
  margin-bottom: 10px;
}
.burger-block {
  width: 100%;
}

.close-div {
  display: flex;
  justify-content: end;
  width: 100%;
  user-select: none;
}
.button-close {
  width: 35px;
  height: 35px;
  cursor: pointer;
}
path {
  fill: white;
}
.button-close:hover path {
  fill: var(--main-color);
}
.into-burger-div {
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 35px;
  gap: 80px;
}
</style>
