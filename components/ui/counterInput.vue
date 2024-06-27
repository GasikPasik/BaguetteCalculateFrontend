<template>
  <div class="quantity-selector">
    <label>Количество рамок</label>
    <div class="quantity-controls">
      <input
        class="input-number"
        v-model="quantity"
        @input="updateWidth"
        ref="inputNumber"
      />
      <button @click="decrease" :class="{ active: quantity > 1 }">-</button>
      <button @click="increase" :class="{ active: true }">+</button>
    </div>
    <span ref="hiddenSpan" class="hidden-span">{{ quantity }}</span>
  </div>
</template>

<script setup>
const quantity = ref(1);
const inputNumber = ref(null);
const hiddenSpan = ref(null);

function increase() {
  quantity.value++;
}

function decrease() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function updateWidth() {
  hiddenSpan.value.textContent = inputNumber.value.value;
  const spanWidth = hiddenSpan.value.offsetWidth;
  inputNumber.value.style.width = `${spanWidth + 10}px`;
}

onMounted(() => {
  updateWidth();
});

watch(quantity, () => {
  updateWidth();
});
</script>
<style scoped>
.quantity-selector {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

button {
  background-color: var(--dark-dark-grey-color);
  color: white;
  border: none;
  outline: none;
  cursor: not-allowed;

  font-family: "Inter", sans-serif;
  font-weight: 600;
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.3s ease-in-out;
  transform: scale(100%);
}

button.active {
  background-color: var(--dark-grey-color);
  cursor: pointer;
}

button.active:hover {
  color: var(--light-main-color);
}

button.active:active {
  font-size: 34px;
  transform: scale(110%);
}
.input-number {
  height: 36px;
  min-width: 32px;
  padding: 0px 8px;
  width: auto;
  border: none;
  outline: none;
  background-color: var(--dark-grey-color);
  color: white;
  text-align: center;
  box-sizing: content-box;
}

.input-number:hover,
.input-number:focus {
  color: var(--main-color);
}

.hidden-span {
  visibility: hidden;
  white-space: pre;
  position: absolute;
  top: -9999px;
  left: -9999px;
}
</style>
