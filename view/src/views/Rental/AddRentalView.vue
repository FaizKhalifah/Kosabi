<script>
import AddRentalCard from "@/components/card/Rental/addRental/AddRentalCard.vue";
export default {
  name: "AddRentalView",
  components: {
    AddRentalCard,
  },
  data() {
    return {
      rooms: [],
      occupants: [],
    };
  },
  mounted() {},
  methods: {
    async fetchRooms() {
      try {
        const response = await fetch(`http://localhost:3001/api/rooms`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }
        this.rooms = result.rooms;
      } catch (error) {
        console.error("Gagal mengambil data ruangan:", error);
      }
    },
    async fetchOccupants() {
      try {
        const response = await fetch(`http://localhost:3001/api/users`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }
        this.occupants = result.users;
      } catch (error) {
        console.error("Gagal mengambil data occupant:", error);
      }
    },
  },
};
</script>
<template>
  <AddRentalCard :room="rooms" :occupants="occupants" />
</template>
