import BoardingHouseView from "@/views/BoardingHouse/BoardingHouseView.vue";
import AddBoardingHouseView from "@/views/BoardingHouse/AddBoardingHouseView.vue";
import UpdateBoardingHouseView from "@/views/BoardingHouse/UpdateBoardingHouseView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
export default [
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
];
