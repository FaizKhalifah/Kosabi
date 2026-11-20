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

    validateForm() {
      if (!this.occupant) {
        throw new Error("Pilih penghuni terlebih dahulu.");
      }
      if (!this.roomNumber) {
        throw new Error("Pilih nomor ruangan terlebih dahulu.");
      }
      if (!this.startDate) {
        throw new Error("Pilih tanggal mulai terlebih dahulu.");
      }
      if (!this.endDate) {
        throw new Error("Pilih tanggal selesai terlebih dahulu.");
      }
      if (!this.monthlyPrice) {
        throw new Error("Pilih harga bulanan terlebih dahulu.");
      }
      if (!this.deposit) {
        throw new Error("Pilih harga deposit terlebih dahulu.");
      }

      if (
        !Number.isFinite(this.monthlyPrice) ||
        this.price < 0 ||
        !Number.isFinite(this.deposit) ||
        this.deposit < 0
      ) {
        throw new Error("Harga dan deposit tidak valid.");
      }

      if (!this.billingDay) {
        throw new Error("Pilih billing day terlebih dahulu.");
      }
      if (!this.notes) {
        throw new Error("Isi catatan terlebih dahulu.");
      }

      const validStatuses = ["ACTIVE", "FINISHED", "CANCELLED"];

      if (!validStatuses.includes(this.status)) {
        throw new Error("Status ruangan tidak valid.");
      }
    },

    async editRental() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        this.validateForm();

        const id = this.$route.params.id;

        const formData = new FormData();
        formData.append("occupant", this.occupant);
        formData.append("roomNumber", this.roomNumber);
        formData.append("startDate", this.startDate);
        formData.append("endDate", this.endDate);
        formData.append("monthlyPrice", this.monthlyPrice);
        formData.append("deposit", this.deposit);
        formData.append("billingDay", this.billingDay);
        formData.append("status", this.status);
        formData.append("notes", this.notes);

        const response = await fetch("http://localhost:3001/api/rentals/", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal memperbarui rental.");
        }

        this.successMessage = "Rental berhasil diperbarui!";

        // Redirect after successful update
        this.$router.push("/rooms");
      } catch (error) {
        console.error("Update error:", error);
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
