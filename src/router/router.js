import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import { createRouter, createWebHistory } from "vue-router/dist/vue-router";
import PostIdPage from "@/components/PostIdPage";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
