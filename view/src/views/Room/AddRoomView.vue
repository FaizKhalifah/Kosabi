<script>
import AddRoomCard from "@/components/card/Room/AddRoomCard.vue";
export default {
  name: "AddRoomView",
  components: { AddRoomCard },
  data() {
    return {
      boardingHouses: [],
    };
  },

  mounted() {
    this.fetchBoardingHouses();
  },
  methods: {
    async fetchBoardingHouses() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/boardingHouse/",
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        this.boardingHouses = result.boardingHouses;
      } catch (error) {
        console.error("Gagal mengambil boarding house:", error);
      }
    },
  },
};
</script>

<template>
  <AddRoomCard :boarding-houses="boardingHouses" />
</template>
