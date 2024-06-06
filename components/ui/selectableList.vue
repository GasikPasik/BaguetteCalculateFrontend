<template>
  <div class="selectable-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['item', { selected: index === localSelectedIndex }]"
      @click="selectItem(index)"
    >
      {{ item }}
      <div v-if="index === localSelectedIndex" class="line-active"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:selectedItem"]);
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
  emit("update:selectedItem", index);
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
}
.item.selected {
  color: var(--main-color);
}
.line-active {
  width: 100%;
  height: 1px;
  background-color: var(--main-color);
}
</style>
