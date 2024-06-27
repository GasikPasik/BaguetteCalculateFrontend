<template>
  <div>
    <WarningModal
      v-if="localData[idxToDel]"
      :body="`Точно ли Вы хотите удалить опцию &quot;${localData[idxToDel][mainName]}&quot;?`"
      :show="isOpenWarning"
      @cancel="closeWarning"
      @confirm="deleteItem"
    />

    <table class="table">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.name">
            {{ header.name }}
          </th>
          <th style="width: 160px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in localData" :key="idx">
          <td
            v-for="(i, key) in headers"
            :key="key"
            :class="{ center: i.type === 4 }"
          >
            <p v-if="i.type === 0">{{ item[key] }}</p>
            <input v-if="i.type === 1" v-model="item[key]" class="input-edit" />
            <input v-if="i.type === 2" v-model="item[key]" type="checkbox" />
            <BaguetteIcon
              v-if="i.type === 4"
              class="ico-baguette"
              :article="item.article"
            />
            <img v-if="i.type === 5" class="image-table" :src="item[key]" />
            <!-- <div v-if="i.type === 5">{{ item[key] }}</div> -->
          </td>
          <td>
            <div class="buttons-container">
              <div class="div-ico-button" @click="confirmDelete(idx)">
                <img class="img-ico-button" src="~/public/ico/trash.svg" />
              </div>
              <div
                v-if="isEdited(idx)"
                class="div-ico-button"
                @click="saveEdit(idx)"
              >
                <img class="img-ico-button" src="~/public/ico/save.svg" />
              </div>
              <div
                v-if="isEdited(idx)"
                class="div-ico-button"
                @click="cancelEdit(idx)"
              >
                <img class="img-ico-button" src="~/public/ico/cross.svg" />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import WarningModal from "~/components/warningModal.vue";
import BaguetteIcon from "~/components/baguetteIcon.vue";

const props = defineProps({
  headers: Object,
  data: Array,
  mainName: String,
});

const emit = defineEmits(["deleteItem", "updateItem"]);

const localData = ref(JSON.parse(JSON.stringify(props.data)));
const isOpenWarning = ref(false);
const idxToDel = ref(0);

watch(
  () => props.data,
  (newData) => {
    localData.value = JSON.parse(JSON.stringify(newData));
  },
  { deep: true }
);

function isEdited(idx) {
  return Object.keys(localData.value[idx]).some(
    (key) => props.data[idx][key] !== localData.value[idx][key]
  );
}

function saveEdit(idx) {
  emit("updateItem", idx, localData.value[idx]);
}

function cancelEdit(idx) {
  localData.value[idx] = JSON.parse(JSON.stringify(props.data[idx]));
}

function deleteItem() {
  closeWarning();
  emit("deleteItem", idxToDel.value);
}

function closeWarning() {
  isOpenWarning.value = false;
}

function confirmDelete(idx) {
  idxToDel.value = idx;
  isOpenWarning.value = true;
}
</script>

<style scoped>
.table {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}
.table thead {
  background-color: var(--main-color);
}
.table th,
td {
  padding: 4px;
}
.table td {
  background-color: white;
  font-family: "Inter", sans-serif;
}
.row {
  display: flex;
  align-items: center;
  text-align: center;
}
.input-edit {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}
.td-button {
  display: flex;
  justify-content: center;
  height: 100%;
}
.buttons-container {
  display: flex;
  justify-content: center;
  gap: 5px;
  width: 150px;
  height: 100%;
}

.div-ico-button {
  height: 100%;
  width: 34px;
  padding: 3px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
.div-ico-button:hover {
  background-color: var(--main-color);
}

.ico-baguette {
  width: 80px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-table {
  max-width: 200px;
  max-height: 200px;
}
</style>
