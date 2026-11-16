import DefaultLayout from "@/layouts/DefaultLayout.vue";
import rentalListView from "@/views/Rental/rentalListView.vue";
import AddRentalView from "@/views/Rental/AddRentalView.vue";
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
      {
        path: "add",
        name: "Add Rentals",
        component: AddRentalView,
      },
    ],
  },
];
