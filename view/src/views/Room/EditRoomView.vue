<script>
import EditRoomCard from "@/components/card/Room/EditRoomCard.vue";
export default {
  name: "EditRoomView",
  components: {
    EditRoomCard,
  },

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
  <EditRoomCard :boarding-houses="boardingHouses" />
</template>
