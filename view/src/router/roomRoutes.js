import RoomListView from "@/views/Room/RoomListView.vue";
import AddRoomView from "@/views/Room/AddRoomView.vue";
import EditRoomView from "@/views/Room/EditRoomView.vue";
export default [
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
    path: "/rooms/edit/:id",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Edit Rooms",
        component: EditRoomView,
      },
    ],
  },
];
