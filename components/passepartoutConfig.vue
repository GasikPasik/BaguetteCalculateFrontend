<template>
  <div class="over-div-pass">
    <div class="label-btn">
      <p>Паспарту</p>
      <CButton @click="emit('clickedPass')">Добавить</CButton>
    </div>
    <div
      v-for="(item, idx) in [{ cuff: '_1' }, { cuff: '_2' }]"
      :key="idx"
      :style="{ width: '100%' }"
    >
      <div
        class="pass"
        :class="{ active: frame && frame['passId' + item.cuff] !== -1 }"
      >
        <div class="pass-left-div">
          <PassepartoutIcon
            :passepartout="{
              article: frame['passArtice' + item.cuff],
              price: '',
              image_path: frame['passImage' + item.cuff],
            }"
            @click="editItem(idx)"
          />
        </div>
        <div class="pass-right-div">
          <div>
            <thinSlider
              nameField="Ширина"
              :startValue="frame.width"
              @changeValue="changeWidth(cuff, $event)"
              :isSlider="windowWidth >= 500"
            ></thinSlider>
            <thinSlider
              nameField="Высота"
              :startValue="frame.height"
              @changeValue="changeHeight(idx, $event)"
              :isSlider="windowWidth >= 500"
            ></thinSlider>
          </div>
          <div class="btn-pass-div">
            <CButton @click="editItem(idx)">Изменить</CButton>
            <CButton @click="deleteItem(idx)">Удалить</CButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CButton from "~/components/ui/cbutton.vue";
import thinSlider from "~/components/ui/thinSlider.vue";
import PassepartoutIcon from "~/components/passepartoutIcon.vue";

const emit = defineEmits(["clickedPass"]);
const props = defineProps({
  frame: { required: true, type: Object },
});

const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

function changeWidth(idx, newWidth) {}

function changeHeight(idx, newHeight) {}

function editItem(idx) {
  emit("clickedPass", idx + 1);
}

function deleteItem(idx) {
  if (idx === 0) {
    if (props.frame.passId_2 !== -1) {
      props.frame.passId_1 = props.frame.passId_2;
      props.frame.passCost_1 = props.frame.passCost_2;
      props.frame.passArtice_1 = props.frame.passArtice_2;
      props.frame.passW_1 = props.frame.passW_2;
      props.frame.passH_1 = props.frame.passH_2;
      props.frame.passImage_1 = props.frame.passImage_2;
      props.frame.passId_2 = -1;
    } else {
      props.frame.passId_1 = -1;
    }
  } else {
    props.frame.passId_2 = -1;
  }

  console.log(idx, props.frame);
}
</script>

<style scoped>
.over-div-pass {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 90%;
}
@media screen and (min-width: 500px) {
  .over-div-pass {
    padding: 0px 60px;
  }
}

.pass {
  display: flex;
  width: 100%;
  gap: 20px;
  height: 0px;
  overflow: hidden;
  transition: height 0.15s ease-in-out;
}
.pass.active {
  height: 183px;
}
.pass-right-div {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn-pass-div,
.label-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.pass-left-div {
  min-width: 120px;
}
.label-btn {
  color: white;
}
</style>
