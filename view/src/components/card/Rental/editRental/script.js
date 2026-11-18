import BaseCard from "@/components/base/BaseCard.vue";
const API_URL = "http://localhost:3001/api/rentals";
const SERVER_URL = "http://localhost:3001";
export default {
  name: "editRentalCard",
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

      status: "AVAILABLE",

      notes: "",

      isLoading: false,
      errorMessage: "",
      isFetching: false,
      successMessage: "",
    };
  },
  async mounted() {
    await this.fetchRentals();
  },
  methods: {
    async fetchRentals() {
      try {
        const id = this.$route.params.id;

        if (!id) {
          throw new Error("ID rental tidak ditemukan.");
        }

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data ruangan.");
        }
        const rental = data.rental;

        if (!rental) {
          throw new Error("Data rental tidak ditemukan.");
        }
        this.occupant = rental.occupant || "";
        this.roomNumber = rental.roomNumber || 0;
        this.startDate = rental.startDate || Date.now();
        this.endDate = rental.endDate || Date.now();
        this.monthlyPrice = rental.monthlyPrice || 0;
        this.deposit = rental.deposit || 0;
        this.billingDay = rental.billingDay || 0;
        this.status = rental.status || "AVAILABLE";
        this.notes = rental.notes || "";
      } catch (error) {
        console.error("Fetch error:", error);
        this.errorMessage = error.message;
      } finally {
        this.isFetching = false;
      }
    },
  },
};
