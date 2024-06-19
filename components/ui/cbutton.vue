<template>
  <button class="custom-button"><slot> </slot></button>
</template>

<style scoped>
.custom-button {
  padding: 5px 14px;
  -webkit-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2) inset;
  -moz-box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2) inset;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2) inset;

  background-color: var(--main-color);
  border: none;
}

.custom-button:hover {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.custom-button:active {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  background-color: white;
}
</style>
