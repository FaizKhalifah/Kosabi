import BaseCard from "@/components/base/BaseCard.vue";

export default {
  name: "AddRoomCard",

  components: {
    BaseCard,
  },

  props: {
    boardingHouses: {
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
      boardingHouse: "",

      roomNumber: "",
      floor: 1,
      type: "",

      price: 0,
      deposit: 0,

      occupant: "",

      capacity: 1,
      size: 0,

      status: "AVAILABLE",

      facilities: [""],
      description: "",

      photos: [],
      previewUrls: [],

      isLoading: false,
      errorMessage: "",
      successMessage: "",
    };
  },

  beforeUnmount() {
    this.previewUrls.forEach((url) => {
      URL.revokeObjectURL(url);
    });
  },

  methods: {
    addFacility() {
      this.facilities.push("");
    },

    removeFacility(index) {
      this.facilities.splice(index, 1);
    },

    handleImageUpload(event) {
      const files = Array.from(event.target.files || []);

      this.errorMessage = "";

      if (files.length === 0) return;

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (this.photos.length + files.length > 10) {
        this.errorMessage = "Maksimal 10 foto ruangan.";
        event.target.value = "";
        return;
      }

      for (const file of files) {
        if (!allowedTypes.includes(file.type)) {
          this.errorMessage = `Format file ${file.name} tidak didukung.`;
          event.target.value = "";
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          this.errorMessage = `Ukuran ${file.name} melebihi 5 MB.`;
          event.target.value = "";
          return;
        }
      }

      this.photos = [...this.photos, ...files];

      const newPreviews = files.map((file) => URL.createObjectURL(file));

      this.previewUrls = [...this.previewUrls, ...newPreviews];

      event.target.value = "";
    },

    removePhoto(index) {
      URL.revokeObjectURL(this.previewUrls[index]);

      this.photos = this.photos.filter((_, i) => i !== index);

      this.previewUrls = this.previewUrls.filter((_, i) => i !== index);
    },

    validateForm() {
      if (!this.boardingHouse) {
        throw new Error("Pilih boarding house terlebih dahulu.");
      }

      if (!this.roomNumber) {
        throw new Error("Nomor ruangan wajib diisi.");
      }

      if (!Number.isInteger(this.floor) || this.floor < 1) {
        throw new Error("Lantai minimal 1.");
      }

      if (!["STANDARD", "DELUXE", "VIP"].includes(this.type)) {
        throw new Error("Tipe ruangan tidak valid.");
      }

      if (
        !Number.isFinite(this.price) ||
        this.price < 0 ||
        !Number.isFinite(this.deposit) ||
        this.deposit < 0
      ) {
        throw new Error("Harga dan deposit tidak valid.");
      }

      if (!Number.isInteger(this.capacity) || this.capacity < 1) {
        throw new Error("Kapasitas minimal 1.");
      }

      if (!Number.isFinite(this.size) || this.size < 0) {
        throw new Error("Ukuran ruangan tidak valid.");
      }

      const validStatuses = [
        "AVAILABLE",
        "OCCUPIED",
        "MAINTENANCE",
        "RESERVED",
      ];

      if (!validStatuses.includes(this.status)) {
        throw new Error("Status ruangan tidak valid.");
      }

      if (this.photos.length === 0) {
        throw new Error("Upload minimal satu foto ruangan.");
      }

      if (this.photos.length > 10) {
        throw new Error("Maksimal 10 foto ruangan.");
      }
    },

    async addRoom() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        this.validateForm();

        const formData = new FormData();

        // Boarding House
        formData.append("boardingHouse", this.boardingHouse);

        // Occupant: null karena ruangan baru belum memiliki penghuni
        formData.append("occupant", this.occupant);

        // Room Information
        formData.append("roomNumber", this.roomNumber);
        formData.append("floor", this.floor);
        formData.append("type", this.type);
        formData.append("description", this.description);

        // Price
        formData.append("price", this.price);
        formData.append("deposit", this.deposit);

        // Capacity and Size
        formData.append("capacity", this.capacity);
        formData.append("size", this.size);

        // Status
        formData.append("status", this.status);

        // Facilities
        const parsedFacilities = this.facilities
          .map((facility) => facility.trim())
          .filter(Boolean);

        formData.append("facilities", JSON.stringify(parsedFacilities));

        // Photos
        this.photos.forEach((photo) => {
          formData.append("photos", photo);
        });

        // Request Backend
        const response = await fetch("http://localhost:3001/api/rooms/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menambahkan ruangan.");
        }

        this.successMessage = "Ruangan berhasil ditambahkan!";

        this.$router.push("/rooms");
      } catch (error) {
        console.error("Error:", error);
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
