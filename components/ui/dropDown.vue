<template>
  <div class="dropdown" ref="dropdown">
    <button @click="toggleDropdown">{{ selectedLabel }}</button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li
        v-for="(option, index) in options"
        :key="option.id"
        @click="selectOption(option.id)"
      >
        {{ option.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdown = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(
    (option) => option.id === props.modelValue
  );
  return selectedOption ? selectedOption.title : "Выбрать материал";
});

const selectOption = (optionId) => {
  const selectedOption = props.options.find((option) => option.id === optionId);
  if (selectedOption) {
    emit("update:modelValue", selectedOption.id);
    isOpen.value = false;
  }
};

watch(
  () => props.modelValue,
  () => {
    isOpen.value = false;
  }
);

onClickOutside(dropdown, () => {
  isOpen.value = false;
});
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.dropdown button {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  width: 100%;
}
.dropdown-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 1000;
}
.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
