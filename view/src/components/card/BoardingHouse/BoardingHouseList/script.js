import BaseCard from "@/components/base/BaseCard.vue";
export default {
  name: "BoardingHouseListCard",

  components: {
    BaseCard,
  },

  data() {
    return {
      boardingHouses: [],
      isLoading: false,
      errorMessage: "",

      // Searching
      searchQuery: "",

      // Sorting
      sortBy: "createdAt",
      sortOrder: "desc",
    };
  },

  created() {
    this.fetchBoardingHouses();
  },

  methods: {
    async fetchBoardingHouses() {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        const params = new URLSearchParams({
          search: this.searchQuery.trim(),
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
        });

        const response = await fetch(
          `http://localhost:3001/api/boardingHouse?${params.toString()}`,
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

        if (!Array.isArray(responseData.boardingHouses)) {
          throw new Error("Format data dari server tidak sesuai.");
        }

        this.boardingHouses = responseData.boardingHouses;
      } catch (error) {
        console.error("Gagal mengambil data kostan:", error);

        this.errorMessage =
          "Data kostan tidak dapat dimuat. Periksa koneksi ke server, lalu coba lagi.";
      } finally {
        this.isLoading = false;
      }
    },

    resetFilters() {
      this.searchQuery = "";
      this.sortBy = "createdAt";
      this.sortOrder = "desc";

      this.fetchBoardingHouses();
    },

    displayValue(value) {
      if (value === null || value === undefined || value === "") {
        return "-";
      }

      return value;
    },

    getPhotoUrl(photo) {
      if (!photo) return "";

      // Mengubah backslash menjadi forward slash
      const normalizedPath = photo.replace(/\\/g, "/").replace(/^\/+/, "");

      return `http://localhost:3001/${normalizedPath}`;
    },

    formatList(value) {
      if (Array.isArray(value)) {
        return value.length > 0 ? value.join(", ") : "-";
      }

      if (value === null || value === undefined || value === "") {
        return "-";
      }

      return value;
    },

    getStatusClass(status) {
      const normalizedStatus = String(status || "")
        .trim()
        .toLowerCase();

      if (
        ["available", "tersedia", "active", "aktif"].includes(normalizedStatus)
      ) {
        return "status-active";
      }

      if (
        ["unavailable", "tidak tersedia", "inactive", "nonaktif"].includes(
          normalizedStatus,
        )
      ) {
        return "status-inactive";
      }

      return "status-neutral";
    },

    addBoardingHouse() {
      this.$router.push("/boardingHouses/add");
    },

    editBoardingHouse(id) {
      this.$router.push(`/boardingHouses/edit/${id}`);
    },

    async deleteBoardingHouse(id) {
      await fetch(`http://localhost:3001/api/boardingHouse/${id}`, {
        method: "DELETE",
      });
      this.fetchBoardingHouses();
    },
  },
};
