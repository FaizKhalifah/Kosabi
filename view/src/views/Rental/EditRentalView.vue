<script>
import EditRentalCard from "@/components/card/Rental/editRental/EditRentalCard.vue";
export default {
  name: "EditRentalView",
  components: {
    EditRentalCard,
  },
  data() {
    return {
      rooms: [],
      occupants: [],
    };
  },
  mounted() {
    this.fetchRooms();
    this.fetchOccupants();
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await fetch("http://localhost:3001/api/rooms/");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        this.rooms = result.rooms;
      } catch (error) {
        console.error("Gagal mengambil room:", error);
      }
    },

    async fetchOccupants() {
      try {
        const response = await fetch("http://localhost:3001/api/users/tenants");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }
        this.occupants = result.tenants;
      } catch (error) {
        console.error("Gagal mengambil occupant:", error);
      }
    },
  },
};
</script>
<template>
  <EditRentalCard :rooms="rooms" :occupants="occupants"></EditRentalCard>
</template>
