<template>
  <div class="selectable-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['item', { selected: index === localSelectedIndex }]"
      @click="selectItem(index)"
    >
      {{ item }}
      <div
        class="line-active"
        :class="{ active: index === localSelectedIndex }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
});

const localSelectedIndex = ref(props.selectedIndex);

const selectItem = (index) => {
  localSelectedIndex.value = index;
  emit("update:modelValue", index);
};

watch(
  () => props.selectedIndex,
  (newIndex) => {
    localSelectedIndex.value = newIndex;
  }
);
</script>

<style scoped>
.selectable-list {
  display: flex;
  color: white;
  gap: 10px;
}
.item {
  cursor: pointer;
  user-select: none;
}
.item.selected {
  color: var(--main-color);
}
.line-active {
  width: 0%;
  height: 1px;
  background-color: var(--main-color);
  transition: width 0.1s ease-in-out;
}
.line-active.active {
  width: 100%;
}
</style>
