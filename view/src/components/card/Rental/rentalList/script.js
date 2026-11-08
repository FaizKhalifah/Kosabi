import BaseCard from "@/components/base/BaseCard.vue";
export default {
  name: "RentalListCard",
  components: {
    BaseCard,
  },
  data() {
    return {
      rentals: [],
      isLoading: false,
      errorMessage: "",

      sortBy: "createdAt",
      sortOrder: "desc",
    };
  },

  created() {
    this.fetchRentals();
  },

  methods: {
    async fetchRentals() {
      this.isLoading = true;
      this.errorMessage = "";

      const params = new URLSearchParams({
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });

      try {
        const response = await fetch(
          `http://localhost:3001/api/rentals?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Server mengembalikan status ${response.status}.`);
        }

        const responseData = await response.json();

        if (!Array.isArray(responseData.rentals)) {
          throw new Error("Format data dari server tidak sesuai.");
        }
        this.rentals = responseData.rentals;
      } catch (error) {
        this.errorMessage =
          "Data rental tidak dapat dimuat. Periksa koneksi ke server, lalu coba lagi.";
      } finally {
        this.isLoading = false;
      }
    },

    resetFilters() {
      this.sortBy = "createdAt";
      this.sortOrder = "desc";
      this.fetchRentals();
    },

    displayValue(value) {
      if (value === null || value === undefined || value === "") {
        return "-";
      }

      return value;
    },

    getStatusClass(status) {
      const normalizedStatus = String(status || "")
        .trim()
        .toLowerCase();

      if (["ACTIVE", "FINISHED", "CANCELLED"].includes(normalizedStatus)) {
        return "status-active";
      }

      if (["ACTIVE", "FINISHED", "CANCELLED"].includes(normalizedStatus)) {
        return "status-inactive";
      }

      return "status-neutral";
    },

    addRental() {
      this.$router.push("/rentals/add");
    },

    editRental(id) {
      this.$router.push(`/rentals/edit/${id}`);
    },

    async deleteRental(id) {
      await fetch(`http://localhost:3001/api/rentals/${id}`, {
        method: "DELETE",
      });
      this.fetchRentals();
    },
  },
};
