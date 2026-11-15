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

      status: "AVAILABLE",

      notes: "",

      isLoading: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
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

    async addRental() {
      this.validateForm();

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
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menambahkan ruangan.");
      }

      this.successMessage = "Rental berhasil ditambahkan!";

      this.$router.push("/rentals");

      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
      } catch (error) {
        console.error("Error:", error);
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
