<template>
  <BoardingHouseCard />
</template>
<script>
import BoardingHouseCard from "@/components/card/BoardingHouse/BoardingHouseCard.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
export default {
  name: "BoardingHouseView",
  components: {
    BoardingHouseCard,
    DefaultLayout,
  },
};
</script>
