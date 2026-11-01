import UserListView from "@/views/Users/UserListView.vue";
import AddUserView from "@/views/Users/AddUserView.vue";
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
      {
        path: "add",
        name: "AddUser",
        component: AddUserView,
      },
    ],
  },
];
