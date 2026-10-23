import RoomListView from "@/views/Room/RoomListView.vue";
import AddRoomView from "@/views/Room/AddRoomView.vue";
import EditRoomView from "@/views/Room/EditRoomView.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

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
      {
        path: "add",
        name: "AddRooms",
        component: AddRoomView,
      },
      {
        path: "edit/:id",
        name: "EditRooms",
        component: EditRoomView,
      },
    ],
  },
];
