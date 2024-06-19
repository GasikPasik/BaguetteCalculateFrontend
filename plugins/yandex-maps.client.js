import { createApp } from "vue";
import { createYmaps } from "vue-yandex-maps";

const settings = {
  apiKey: "b5f6dc29-acdc-4e43-b394-425270ed1220",
};

export default defineNuxtPlugin((nuxtApp) => {
  const yandexMap = createYmaps({
    apikey: "b5f6dc29-acdc-4e43-b394-425270ed1220",
    lang: "ru_RU",
  });
  nuxtApp.vueApp.use(yandexMap);
});
