import { useRouter } from "vue-router";
export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const token = localStorage.getItem("token");
    const router = useRouter();
    if (token) return;
    router.push("/admin/");
  }
});

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   if (process.client) {
//     const token = localStorage.getItem("token");
//     if (!token && to.path.startsWith("/admin/") && to.path !== "/admin/") {
//       return await navigateTo("/admin/");
//     }
//   }
// });
