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
        </div>
      </div>

      <div v-if="Object.keys(offerTabs).length" class="burger-block">
        <h1>Меню заказов</h1>
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
        <h1>Админ меню</h1>
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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isOpen: { default: false },
  adminTabs: { default: {} },
  offerTabs: { default: {} },
});
const emit = defineEmits(["close"]);

const tabs = { Конструктор: "/", "О нас": "/about" };

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
}
.over-div-burger {
  position: fixed;
  top: 0;
  right: 0;
  overflow: hidden;
  width: 40%;
  min-width: 500px;
  max-width: 800px;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  z-index: 100;
}
.burger-div {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: var(--dark-grey-color);
  transition: transform 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 40px 130px;
  gap: 80px;
  color: white;
  box-shadow: 0px 0px 50px 15px rgba(10, 10, 10, 0.3) inset;
}
.burger-div p {
  text-align: end;
  width: 100%;
  border-bottom: 3px solid rgb(30, 30, 30);
}
.burger-div p:hover {
  border-bottom: 3px solid var(--main-color);
  cursor: pointer;
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
</style>
