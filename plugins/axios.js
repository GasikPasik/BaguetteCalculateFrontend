import axios from "axios";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const defaultUrl = config.public.backendUrl;
  console.log("Axios URL:", defaultUrl);

  const api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });

  return {
    provide: {
      api,
    },
  };
});
