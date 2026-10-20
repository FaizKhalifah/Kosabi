import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

import DashboardView from "@/views/DashboardView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import BoardingHouseView from "@/views/BoardingHouse/BoardingHouseView.vue";
import AddBoardingHouseView from "@/views/BoardingHouse/AddBoardingHouseView.vue";
import UpdateBoardingHouseView from "@/views/BoardingHouse/UpdateBoardingHouseView.vue";
import RoomListView from "@/views/Room/RoomListView.vue";
import AddRoomView from "@/views/Room/AddRoomView.vue";

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
    path: "/boardingHouses/edit/:id",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "update boarding house",
        component: UpdateBoardingHouseView,
      },
    ],
  },
  {
    path: "/rooms",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Rooms",
        component: RoomListView,
      },
    ],
  },

  ,
  {
    path: "/rooms/add",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Add Rooms",
        component: AddRoomView,
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
