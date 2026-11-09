import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardView from "@/views/DashboardView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import boardingHouseRoutes from "./boardingHouseRoutes";
import roomRoutes from "./roomRoutes";
import userRoutes from "./userRoutes";
import rentalRoutes from "./rentalRoutes";

const routes = [
  ...boardingHouseRoutes,
  ...roomRoutes,
  ...userRoutes,
  ...rentalRoutes,
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardView,
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
