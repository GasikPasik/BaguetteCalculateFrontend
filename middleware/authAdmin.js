import { useRouter } from "vue-router";
export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const token = localStorage.getItem("token");
    const router = useRouter();
    if (token) return;
    router.push("/admin/");
  }
});


