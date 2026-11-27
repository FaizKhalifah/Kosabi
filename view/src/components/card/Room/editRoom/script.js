import BaseCard from "@/components/base/BaseCard.vue";
const API_URL = "http://localhost:3001/api/rooms";
const SERVER_URL = "http://localhost:3001";
export default {
  name: "editRoomCard",
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

      existingPhotos: [],
      newPhotos: [],
      photoCounter: 0,

      isFetching: false,
      isLoading: false,
      errorMessage: "",
      successMessage: "",
    };
  },

  computed: {
    totalPhotos() {
      return this.existingPhotos.length + this.newPhotos.length;
    },
  },

  async mounted() {
    await this.fetchRooms();
  },

  beforeUnmount() {
    this.newPhotos.forEach((photo) => {
      URL.revokeObjectURL(photo.url);
    });
  },

  methods: {
    async fetchRooms() {
      this.isFetching = true;
      this.errorMessage = "";

      try {
        const id = this.$route.params.id;

        if (!id) {
          throw new Error("ID ruangan tidak ditemukan.");
        }

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data ruangan.");
        }

        const room = data.room;

        if (!room) {
          throw new Error("Data ruangan tidak ditemukan.");
        }

        // Basic information
        this.boardingHouse =
          room.boardingHouse?._id || room.boardingHouse || "";

        this.roomNumber = room.roomNumber || "";
        this.floor = room.floor ?? 1;
        this.type = room.type || "";
        this.price = room.price ?? 0;
        this.deposit = room.deposit ?? 0;
        this.capacity = room.capacity ?? 1;
        this.size = room.size ?? 0;

        // Facilities
        this.facilities = room.facilities?.length ? [...room.facilities] : [""];

        // Description
        this.description = room.description || "";

        // Status
        this.status = room.status || "AVAILABLE";

        // Existing photos
        this.existingPhotos = (room.photos || []).map((path) => ({
          path,
          url: this.getPhotoUrl(path),
        }));
      } catch (error) {
        console.error("Fetch error:", error);
        this.errorMessage = error.message;
      } finally {
        this.isFetching = false;
      }
    },

    getPhotoUrl(path) {
      const normalizedPath = path.replace(/\\/g, "/");

      return `${SERVER_URL}/${normalizedPath}`;
    },

    addFacility() {
      this.facilities.push("");
    },

    removeFacility(index) {
      this.facilities.splice(index, 1);
    },

    handleImageUpload(event) {
      const files = Array.from(event.target.files || []);

      this.errorMessage = "";

      if (!files.length) return;

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (this.totalPhotos + files.length > 10) {
        this.errorMessage = "Maksimal 10 foto secara keseluruhan.";
        event.target.value = "";
        return;
      }

      // Validate all files before adding any
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

      const uploadedPhotos = files.map((file) => ({
        id: ++this.photoCounter,
        file,
        url: URL.createObjectURL(file),
      }));

      this.newPhotos.push(...uploadedPhotos);

      // Allow selecting the same file again
      event.target.value = "";
    },

    removeExistingPhoto(index) {
      this.existingPhotos.splice(index, 1);
    },

    removeNewPhoto(index) {
      const photo = this.newPhotos[index];

      URL.revokeObjectURL(photo.url);

      this.newPhotos.splice(index, 1);
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

      if (this.totalPhotos === 0) {
        throw new Error("Minimal harus ada satu foto ruangan.");
      }

      if (this.totalPhotos > 10) {
        throw new Error("Maksimal 10 foto ruangan.");
      }
    },

    async editRoom() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        this.validateForm();

        const id = this.$route.params.id;

        const formData = new FormData();

        formData.append("boardingHouse", this.boardingHouse);

        // Occupant: null karena ruangan baru belum memiliki penghuni
        if (this.occupant) {
          formData.append("occupant", this.occupant);
        } else {
          formData.append("occupant", null);
        }

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

        // Existing photos that should be retained
        formData.append(
          "existingPhotos",
          JSON.stringify(this.existingPhotos.map((photo) => photo.path)),
        );

        // New photos
        this.newPhotos.forEach((photo) => {
          formData.append("photos", photo.file);
        });

        // Request backend
        const response = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal memperbarui ruangan.");
        }

        this.successMessage = "Ruangan berhasil diperbarui!";

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
