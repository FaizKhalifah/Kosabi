import DefaultLayout from "@/layouts/DefaultLayout.vue";
import rentalListView from "@/views/Rental/rentalListView.vue";
export default [
  {
    path: "/rentals",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Rentals",
        component: rentalListView,
      },
    ],
  },
];
