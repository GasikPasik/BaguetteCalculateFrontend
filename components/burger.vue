<template>
  <div class="over-div-burger">
    <div
      :class="[
        'burger-div',
        { 'burger-div-open': isOpen, 'burger-div-close': !isOpen },
      ]"
    >
      <h1>Меню</h1>
      <button class="close-button" @click="closeMenu">×</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ isOpen: { default: false } });
</script>
<style scoped>
.over-div-burger {
  position: absolute;
  overflow: hidden;
  width: 40%;
  min-width: 500px;
  max-width: 800px;
  height: 100%;
  right: 0;
}
.burger-div {
  position: absolute;
  right: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: var(--dark-grey-color);
  /* padding: 25px; */
  transition: transform 0.3s ease-in-out;
}
.burger-div-open {
  transform: translateX(0);
}
.burger-div-close {
  transform: translateX(100%);
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
}
</style>
