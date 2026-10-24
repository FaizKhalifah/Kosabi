<template>
  <BaseCard>
    <form @submit.prevent="addRoom">
      <h2>Tambah Ruangan</h2>

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

      <section>
        <h3>Informasi Penghuni Ruangan</h3>

        <div class="form-group">
          <label>Penghuni ruangan</label>

          <select v-model="occupant" required>
            <option value="" disabled>Pilih Tenant</option>

            <option
              v-for="tenant in occupants"
              :key="tenant._id"
              :value="tenant._id"
            >
              {{ tenant.name }}
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

<style scoped>
form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
}

section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2,
h3 {
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

input,
textarea,
select {
  box-sizing: border-box;
  width: 100%;
  max-width: 30rem;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.dynamic-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 35rem;
}

.dynamic-group input {
  flex: 1;
}

button {
  cursor: pointer;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  transition: 0.3s;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.add-button {
  background: white;
  border: 1px solid #333;
  align-self: flex-start;
}

.add-button:hover {
  background: #eee;
}

.remove-button {
  background: #dc3545;
  color: white;
  border: none;
}

.remove-button:hover {
  background: #b02a37;
}

.helper-text {
  font-size: 0.85rem;
  color: #777;
  margin: 0;
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.preview-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.preview-item img {
  width: 150px;
  height: 120px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.submit-button {
  margin-top: 1rem;
  width: 15rem;
  background: black;
  color: white;
  border: 1px solid black;
}

.submit-button:hover:not(:disabled) {
  background: white;
  color: black;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}

@media (max-width: 600px) {
  .dynamic-group {
    flex-wrap: wrap;
  }
}
</style>

<script>
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
</script>
