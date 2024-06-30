import { ref } from "vue";

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&family=Inter:wght@100..900&family=Poetsen+One&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      backendUrl: backendUrl,
      pathDefImage: backendUrl + "/static/def1.jpg",
      adminTabs: {
        points: "Адреса точек",
        options: "Опции заказа",
        offers: "Сотрудники",
        baguettes: "Багет",
        glass: "Стекло",
      },
      offerTabs: {
        orders: "Заказы",
      },
    },
  },
});
