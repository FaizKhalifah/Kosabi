import UserListView from "@/views/Users/UserListView.vue";

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
