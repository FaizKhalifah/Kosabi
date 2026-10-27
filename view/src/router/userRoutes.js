import UserListView from "@/views/Users/UserListView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default [
  {
    path: "/users",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Users",
        component: UserListView,
      },
    ],
  },
];
