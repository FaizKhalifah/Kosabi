import BaseCard from "@/components/base/BaseCard.vue";
export default {
  name: "RoomListCard",
  components: {
    BaseCard,
  },
  data() {
    return {
      rooms: [],
      isLoading: false,
      errorMessage: "",

      sortBy: "createdAt",
      sortOrder: "desc",
    };
  },

  created() {
    this.fetchRooms();
  },

  methods: {
    async fetchRooms() {
      this.isLoading = true;
      this.errorMessage = "";

      const params = new URLSearchParams({
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });

      try {
        const response = await fetch(
          `http://localhost:3001/api/rooms?${params.toString()}`,
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

        if (!Array.isArray(responseData.rooms)) {
          throw new Error("Format data dari server tidak sesuai.");
        }

        console.log("Informasi  : ", responseData.rooms);
        this.rooms = responseData.rooms;
      } catch (error) {
        console.error("Gagal mengambil data ruangan:", error);

        this.errorMessage =
          "Data ruangan tidak dapat dimuat. Periksa koneksi ke server, lalu coba lagi.";
      } finally {
        this.isLoading = false;
      }
    },

    resetFilters() {
      this.sortBy = "createdAt";
      this.sortOrder = "desc";
      this.fetchRooms();
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
        ["available", "ditempati", "direnovasi", "direservasi"].includes(
          normalizedStatus,
        )
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

    addRoom() {
      this.$router.push("/rooms/add");
    },

    editRoom(id) {
      this.$router.push(`/rooms/edit/${id}`);
    },

    async deleteRoom(id) {
      await fetch(`http://localhost:3001/api/room/${id}`, {
        method: "DELETE",
      });
      this.fetchRooms();
    },
  },
};
