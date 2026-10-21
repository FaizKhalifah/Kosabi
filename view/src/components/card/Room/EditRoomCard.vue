<script>
import BaseCard from "@/components/base/BaseCard.vue";
const API_URL = "http://localhost:3001/api/rooms";
const SERVER_URL = "http://localhost:3001";
export default {
  name: "editRoomCard",
  components: {
    BaseCard,
  },
  data() {
    return {
      boardingHouse: "",

      roomNumber: "",
      floor: 1,
      type: "",

      price: 0,
      deposit: 0,

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
          throw new Error("Data ruangan house tidak ditemukan.");
        }

        // Basic information
        this.boardingHouse = house.boardingHouse || "";
        this.roomNumber = house.roomNumber || "";
        this.floor = house.floor || "";
        this.type = house.type || "";
        this.price = house.price || "";
        this.deposit = house.deposit || "";
        this.capacity = house.capacity || "";
        this.size = house.size || "";

        // Dynamic arrays
        this.rules = house.rules?.length ? [...house.rules] : [""];

        this.facilities = room.facilities?.length ? [...room.facilities] : [""];

        this.description = room.description;

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

      if (this.photos.length === 0) {
        throw new Error("Upload minimal satu foto ruangan.");
      }

      if (this.photos.length > 10) {
        throw new Error("Maksimal 10 foto ruangan.");
      }
    },

    async updateRooms() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        this.validateForm();

        const id = this.$route.params.id;

        const formData = new FormData();

        formData.append("boardingHouse", this.boardingHouse);

        // Occupant: null karena ruangan baru belum memiliki penghuni
        formData.append("occupant", "");

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
</script>

<template>
  <BaseCard>
    <form @submit.prevent="editRoom">
      <h2>Edit Ruangan</h2>

      <!-- BOARDING HOUSE -->
      <section>
        <h3>Informasi Boarding House</h3>

        <div class="form-group">
          <label>Boarding House</label>

          <select v-model="boardingHouse" required>
            <option value="" disabled>Pilih Boarding House</option>

            <option
              v-for="house in boardingHouses"
              :key="house._id"
              :value="house._id"
            >
              {{ house.name }}
            </option>
          </select>
        </div>
      </section>

      <!-- ROOM INFORMATION -->
      <section>
        <h3>Informasi Ruangan</h3>

        <div class="form-group">
          <label>Nomor Ruangan</label>
          <input
            v-model.trim="roomNumber"
            type="text"
            placeholder="Contoh: A01"
            required
          />
        </div>

        <div class="form-group">
          <label>Lantai</label>
          <input
            v-model.number="floor"
            type="number"
            min="1"
            placeholder="Contoh: 1"
            required
          />
        </div>

        <div class="form-group">
          <label>Tipe Ruangan</label>

          <select v-model="type" required>
            <option value="" disabled>Pilih tipe ruangan</option>
            <option value="STANDARD">STANDARD</option>
            <option value="DELUXE">DELUXE</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div class="form-group">
          <label>Deskripsi</label>
          <textarea
            v-model.trim="description"
            placeholder="Deskripsi ruangan"
          ></textarea>
        </div>
      </section>

      <!-- PRICE -->
      <section>
        <h3>Informasi Harga</h3>

        <div class="form-group">
          <label>Harga Sewa</label>
          <input
            v-model.number="price"
            type="number"
            min="0"
            placeholder="Contoh: 1500000"
            required
          />
        </div>

        <div class="form-group">
          <label>Deposit</label>
          <input
            v-model.number="deposit"
            type="number"
            min="0"
            placeholder="Contoh: 500000"
            required
          />
        </div>
      </section>

      <!-- CAPACITY -->
      <section>
        <h3>Kapasitas dan Ukuran</h3>

        <div class="form-group">
          <label>Kapasitas Penghuni</label>
          <input
            v-model.number="capacity"
            type="number"
            min="1"
            placeholder="Contoh: 2"
            required
          />
        </div>

        <div class="form-group">
          <label>Ukuran Ruangan (m²)</label>
          <input
            v-model.number="size"
            type="number"
            min="0"
            step="any"
            placeholder="Contoh: 20"
            required
          />
        </div>
      </section>

      <!-- STATUS -->
      <section>
        <h3>Status Ruangan</h3>

        <div class="form-group">
          <label>Status</label>

          <select v-model="status" required>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="OCCUPIED">OCCUPIED</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
            <option value="RESERVED">RESERVED</option>
          </select>
        </div>
      </section>

      <!-- FACILITIES -->
      <section>
        <h3>Fasilitas Ruangan</h3>

        <div
          v-for="(facility, index) in facilities"
          :key="'facility-' + index"
          class="dynamic-group"
        >
          <input
            v-model.trim="facilities[index]"
            type="text"
            placeholder="Masukkan fasilitas"
          />

          <button
            type="button"
            class="remove-button"
            @click="removeFacility(index)"
          >
            Hapus
          </button>
        </div>

        <button type="button" class="add-button" @click="addFacility">
          + Tambah Fasilitas
        </button>
      </section>

      <!-- PHOTOS -->
      <section>
        <h3>Foto Ruangan</h3>

        <div class="form-group">
          <label>Upload Foto Ruangan</label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            @change="handleImageUpload"
          />

          <p class="helper-text">
            Maksimal 10 foto. Format JPG, PNG, atau WEBP. Maksimal 5 MB per
            foto.
          </p>
        </div>

        <div v-if="previewUrls.length > 0" class="preview-container">
          <div
            v-for="(url, index) in previewUrls"
            :key="url"
            class="preview-item"
          >
            <img :src="url" alt="Preview foto ruangan" />

            <button
              type="button"
              class="remove-button"
              @click="removePhoto(index)"
            >
              Hapus
            </button>
          </div>
        </div>
      </section>

      <!-- FEEDBACK -->
      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>

      <!-- SUBMIT -->
      <button type="submit" class="submit-button" :disabled="isLoading">
        {{ isLoading ? "Menyimpan..." : "Tambah Ruangan" }}
      </button>
    </form>
  </BaseCard>
</template>
