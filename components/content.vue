<template>
  <div class="div-content">
    <div class="temp">
      <Preview :frame="frame" />
    </div>
    <div class="end">
      <TotalInfo />
    </div>
  </div>
</template>

<script setup>
import Preview from "~/components/preview.vue";
import TotalInfo from "~/components/totalInfo.vue";
const props = defineProps({ frame: { require: true } });
</script>

<style scoped>
.div-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 30px;
  -webkit-box-shadow: 0px 0px 60px 60px rgba(0, 0, 0, 0.3) inset;
  -moz-box-shadow: 0px 0px 60px 60px rgba(0, 0, 0, 0.3) inset;
  box-shadow: 0px 0px 60px 60px rgba(0, 0, 0, 0.3) inset;
}

.temp {
  width: 300px;
  height: 200px;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
}
.end {
  padding-bottom: 150px;
}
</style>
