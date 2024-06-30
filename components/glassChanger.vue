<template>
  <div class="glass-config">
    <h1>Выбрать cтекло</h1>
    <div class="glass-header">
      <CButton @click="emit('back')">Назад</CButton>
    </div>
    <div class="gallery" v-if="glass.length > 0">
      <div
        v-for="(g, idx) in glass"
        :key="g.id"
        class="glass"
        :class="{ active: g.id === frame.glassId }"
        @click="changeGlass(idx)"
      >
        <div class="top-glass size-font">
          {{ g.title }}
          <div class="size-font">
            {{ g.price }}
            <span :style="{ opacity: '70%' }">руб. кв.м.</span>
          </div>
        </div>
        <p class="disc-glass">
          {{ g.description }}
        </p>
      </div>
    </div>
    <p v-else :style="{ color: 'white', opacity: '60%' }">
      Загружаем ассортимент...
    </p>
  </div>
</template>

<script setup>
import CButton from "~/components/ui/cbutton.vue";
const { $api } = useNuxtApp();

const emit = defineEmits(["back"]);
const props = defineProps({ frame: { require: true } });

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl;

const glass = ref([]);
async function uploadingBagguet() {
  try {
    const response = await $api.get("/api/v1/glass/");
    glass.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

function changeGlass(idx) {
  props.frame.glassId = glass.value[idx].id;
  props.frame.glassCost = glass.value[idx].price;
}

onMounted(uploadingBagguet);
</script>

<style scoped>
.glass-config {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.glass-header {
  display: flex;
  justify-content: end;
  align-items: center;
  padding-bottom: 20px;
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}
.glass {
  color: white;
  padding: 15px;

  border-radius: 5px;
  border: 3px solid rgba(250, 250, 250, 0.1);
  cursor: pointer;

  transition: border-color 0.2s ease, color 0.2s ease, transform 0.1s ease,
    background-color 0.1s ease;
}
.glass.active {
  border: 3px solid var(--main-color);
  color: var(--main-color);
}
.glass:hover {
  transform: translateX(-10px);
}
.glass:active {
  background-color: var(--main-color);
  color: white;
}
.disc-glass {
  opacity: 70%;
  width: 70%;
}
.top-glass {
  display: flex;
  justify-content: space-between;
}
.size-font {
  font-size: 28px;
}
</style>
