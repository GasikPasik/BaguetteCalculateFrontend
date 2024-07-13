<template>
  <div class="div-content">
    <div class="main-div-preview">
      <div class="div-preview-size">
        <!-- <div
          class="content"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
        >
          <div
            v-show="isMagnifierVisible"
            :style="magnifierStyle"
            class="magnifier"
          ></div> -->
        <Preview :frame="frame" />
        <!-- </div> -->
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

// const isMagnifierVisible = ref(false);
// const magnifierStyle = ref({});

// const handleMouseMove = (event) => {
//   const contentRect = event.currentTarget.getBoundingClientRect();
//   const x = event.clientX - contentRect.left;
//   const y = event.clientY - contentRect.top;

//   magnifierStyle.value = {
//     left: `${x - 50}px`,
//     top: `${y - 50}px`,
//     display: "block",
//     backgroundPosition: `-${x * 2}px -${y * 2}px`,
//   };

//   isMagnifierVisible.value = true;
// };

// const handleMouseLeave = () => {
//   isMagnifierVisible.value = false;
// };
</script>

<style scoped>
.div-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* gap: 30px; */
  -webkit-box-shadow: 0px 0px 60px 60px rgba(0, 0, 0, 0.3) inset;
  -moz-box-shadow: 0px 0px 60px 60px rgba(0, 0, 0, 0.3) inset;
  box-shadow: 0px 0px 60px 60px rgba(0, 0, 0, 0.3) inset;
  padding-bottom: 50px;
  padding-right: 0px;
}

.main-div-preview {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  padding: 20px;
}
.div-preview-size {
  width: 80%;
  height: 75%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.end {
  padding-bottom: 50px;
  padding: 15px;
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* background-color: rgb(250, 0, 0, 0.2); */
}

.magnifier {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 3px solid #000;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.7);
  background-size: 200% 200%;
  cursor: none;
  z-index: 20;
}
</style>
