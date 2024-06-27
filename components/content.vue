<template>
  <div class="div-content">
    <div class="main-div-preview">
      <div class="div-preview-size">
        <Preview :frame="frame" />
      </div>
    </div>
    <div class="end">
      <TotalInfo :frame="frame" />
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

.main-div-preview {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.div-preview-size {
  width: 80%;
  height: 60%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.end {
  padding-bottom: 50px;
}
</style>
