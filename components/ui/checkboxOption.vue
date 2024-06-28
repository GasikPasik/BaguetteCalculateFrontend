<template>
  <div class="div-checkbox">
    <div class="div-checkbox-left">
      {{ label }}
    </div>
    <div class="div-checkbox-right" :class="{ checked: isChecked }">
      {{ price }} {{ isQ ? "руб. кв.м." : "рублей" }}
      <Checkbox @toggle="toggleCheck" :isChecked="isChecked" />
    </div>
  </div>
</template>

<script setup>
import Checkbox from "~/components/ui/checkbox.vue";

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
  isChecked: {
    default: false,
  },
});
const isChecked = ref(props.isChecked);

const emit = defineEmits(["changeValue"]);

function toggleCheck(newValue) {
  isChecked.value = newValue;
  emit("changeValue", newValue);
}
</script>

<style scoped>
.div-checkbox {
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 30px;
}
.div-checkbox-right {
  display: flex;
  gap: 5px;
  color: #bcbcbc;
}
.div-checkbox-right.checked {
  color: var(--main-color);
}
</style>
