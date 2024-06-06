import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = process.env.BACKEND_URL || "http://localhost:8000";

  let api = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });

  return {
    provide: {
      api: api,
    },
  };
});
