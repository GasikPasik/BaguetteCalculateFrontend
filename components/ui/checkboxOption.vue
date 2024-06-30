<template>
  <div
    class="div-checkbox"
    @mousemove="updateMousePosition"
    @mouseleave="showDisc = false"
    @mouseenter="showDisc = true"
  >
    <div class="div-checkbox-left">
      {{ label }}
    </div>
    <div class="div-checkbox-right" :class="{ checked: isChecked }">
      {{ price }}
      <span v-if="isQ">руб. кв.м.</span>
      <span v-else><Rubles :rubles="price" /></span>
      <Checkbox @toggle="toggleCheck" :isChecked="isChecked" />
    </div>
    <div
      v-if="showDisc && description !== ''"
      class="description-tooltip"
      :style="{ top: mouseY + 'px', left: mouseX + 'px' }"
    >
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Checkbox from "~/components/ui/checkbox.vue";
import Rubles from "~/components/ui/rubles.vue";

const props = defineProps({
  label: {
    type: String,
    default: "Any text",
  },
  price: {
    type: Number,
    default: 100,
  },
  isQ: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const isChecked = ref(props.isChecked);
const showDisc = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);

const emit = defineEmits(["changeValue"]);

function toggleCheck(newValue) {
  isChecked.value = newValue;
  emit("changeValue", newValue);
}

function updateMousePosition(event) {
  mouseX.value = event.clientX + 10; // Adjust for padding
  mouseY.value = event.clientY + 10; // Adjust for padding
}
</script>

<style scoped>
.div-checkbox-left {
  cursor: default;
}
.div-checkbox {
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
  position: relative;
}
.div-checkbox-right {
  display: flex;
  gap: 5px;
  cursor: default;
  color: #bcbcbc;
}
.div-checkbox-right.checked {
  color: var(--main-color);
}
.description-tooltip {
  position: fixed;
  background-color: rgb(10, 10, 10);
  color: white;
  padding: 6px;
  border-radius: 3px;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
  font-size: 16px;
  opacity: 85%;
}
</style>
