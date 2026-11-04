import UserListView from "@/views/Users/UserListView.vue";
import AddUserView from "@/views/Users/AddUserView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EditUserView from "@/views/Users/EditUserView.vue";

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
  {
    path: "/users/add",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "add users",
        component: AddUserView,
      },
    ],
  },
  {
    path: "/users/edit/:id",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Edit users",
        component: EditUserView,
      },
    ],
  },
];
