import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import DashboardView from "@/views/DashboardView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import BoardingHouseView from "@/views/BoardingHouse/BoardingHouseView.vue";
import AddBoardingHouseView from "@/views/BoardingHouse/AddBoardingHouseView.vue";

const routes = [
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
    path: "/boardingHouses",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "boarding houses",
        component: BoardingHouseView,
      },
    ],
  },

  {
    path: "/boardingHouses/add",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "add boarding house",
        component: AddBoardingHouseView,
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
