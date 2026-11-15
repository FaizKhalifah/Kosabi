import BaseCard from "@/components/base/BaseCard.vue";
export default {
  name: "AddRentalCard",
  components: {
    BaseCard,
  },
  props: {
    rooms: {
      type: Array,
      default: () => [],
    },

    occupants: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      occupant: "",

      roomNumber: "",
      startDate: 1,
      endDate: "",

      monthlyPrice: 0,
      deposit: 0,

      billingDay: "",

      capacity: 1,
      size: 0,

      status: "AVAILABLE",

      notes: "",

      isLoading: false,
      errorMessage: "",
      successMessage: "",
    };
  },
};
