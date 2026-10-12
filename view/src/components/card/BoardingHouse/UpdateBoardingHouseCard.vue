<template>
  <BaseCard>
    <form @submit.prevent="updateBoardingHouse">
      <h2>Update Boarding House</h2>

      <!-- INFORMASI DASAR -->
      <section>
        <h3>Informasi Kostan</h3>

        <div class="form-group">
          <label>Nama Kostan</label>
          <input
            v-model.trim="name"
            type="text"
            placeholder="Nama kostan"
            required
          />
        </div>

        <div class="form-group">
          <label>Deskripsi</label>
          <textarea
            v-model.trim="description"
            placeholder="Deskripsi kostan"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label>Alamat</label>
          <input
            v-model.trim="address"
            type="text"
            placeholder="Alamat lengkap"
            required
          />
        </div>

        <div class="form-group">
          <label>Kota</label>
          <input v-model.trim="city" type="text" placeholder="Kota" required />
        </div>

        <div class="form-group">
          <label>Provinsi</label>
          <input
            v-model.trim="province"
            type="text"
            placeholder="Provinsi"
            required
          />
        </div>

        <div class="form-group">
          <label>Kode Pos</label>
          <input
            v-model.trim="postalCode"
            type="text"
            placeholder="Kode pos"
            required
          />
        </div>
      </section>

      <!-- KONTAK -->
      <section>
        <h3>Informasi Kontak</h3>

        <div class="form-group">
          <label>Email Kostan</label>
          <input
            v-model.trim="email"
            type="email"
            placeholder="email@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label>Nomor Telepon</label>
          <input
            v-model.trim="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            required
          />
        </div>
      </section>

      <!-- RULES -->
      <section>
        <h3>Aturan Kostan</h3>

        <div
          v-for="(rule, index) in rules"
          :key="'rule-' + index"
          class="dynamic-group"
        >
          <input
            v-model.trim="rules[index]"
            type="text"
            placeholder="Masukkan aturan"
          />

          <button
            type="button"
            class="remove-button"
            @click="removeRule(index)"
          >
            Hapus
          </button>
        </div>

        <button type="button" class="add-button" @click="addRule">
          + Tambah Aturan
        </button>
      </section>

      <!-- FACILITIES -->
      <section>
        <h3>Fasilitas Kostan</h3>

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

      <!-- LOCATION -->
      <section>
        <h3>Lokasi Kostan</h3>

        <p class="helper-text">
          Klik pada peta atau geser marker untuk mengubah lokasi boarding house.
        </p>

        <div class="map-container">
          <div ref="map" class="map"></div>
        </div>

        <div class="form-group">
          <label>Latitude</label>
          <input
            v-model.number="location.latitude"
            type="number"
            step="any"
            placeholder="-7.250445"
            required
            @change="updateMarkerFromInput"
          />
        </div>

        <div class="form-group">
          <label>Longitude</label>
          <input
            v-model.number="location.longitude"
            type="number"
            step="any"
            placeholder="112.768845"
            required
            @change="updateMarkerFromInput"
          />
        </div>
      </section>

      <!-- STATUS -->
      <section>
        <h3>Status Kostan</h3>

        <div class="form-group">
          <label>Status</label>

          <select v-model="status" required>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </section>

      <!-- PHOTOS -->
      <section>
        <h3>Foto Kostan</h3>

        <!-- FOTO LAMA -->
        <div v-if="existingPhotos.length > 0">
          <h4>Foto Tersimpan</h4>

          <div class="preview-container">
            <div
              v-for="(photo, index) in existingPhotos"
              :key="photo.path"
              class="preview-item"
            >
              <img :src="photo.url" alt="Foto kostan tersimpan" />

              <button
                type="button"
                class="remove-button"
                @click="removeExistingPhoto(index)"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>

        <!-- FOTO BARU -->
        <div class="form-group">
          <label>Upload Foto Baru</label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            @change="handleImageUpload"
          />

          <p class="helper-text">
            Maksimal 10 foto secara keseluruhan. Format JPG, PNG, atau WEBP.
            Maksimal 5 MB per foto.
          </p>
        </div>

        <div v-if="newPhotos.length > 0">
          <h4>Foto Baru</h4>

          <div class="preview-container">
            <div
              v-for="(photo, index) in newPhotos"
              :key="photo.id"
              class="preview-item"
            >
              <img :src="photo.url" alt="Preview foto baru" />

              <button
                type="button"
                class="remove-button"
                @click="removeNewPhoto(index)"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>

        <p class="helper-text">Total foto: {{ totalPhotos }} / 10</p>
      </section>

      <!-- FEEDBACK -->
      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>

      <!-- SUBMIT -->
      <button
        type="submit"
        class="submit-button"
        :disabled="isLoading || isFetching"
      >
        {{
          isFetching
            ? "Mengambil data..."
            : isLoading
            ? "Menyimpan..."
            : "Update Boarding House"
        }}
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
h3,
h4 {
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

.map-container {
  width: 100%;
  max-width: 40rem;
}

.map {
  height: 350px;
  width: 100%;
  border-radius: 0.75rem;
  z-index: 1;
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

  .map {
    height: 280px;
  }
}
</style>

<script>
import BaseCard from "@/components/base/BaseCard.vue";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icon Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const API_URL = "http://localhost:3001/api/boardingHouse";
const SERVER_URL = "http://localhost:3001";

export default {
  name: "UpdateBoardingHouseCard",

  components: {
    BaseCard,
  },

  data() {
    return {
      // Basic information
      name: "",
      description: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",

      // Contact
      email: "",
      phone: "",

      // Dynamic data
      rules: [],
      facilities: [],

      // Location
      location: {
        latitude: null,
        longitude: null,
      },

      // Status
      status: "ACTIVE",

      // Photos
      existingPhotos: [],
      newPhotos: [],
      photoCounter: 0,

      // Map
      map: null,
      marker: null,

      // State
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
    await this.fetchBoardingHouse();

    this.$nextTick(() => {
      this.initializeMap();
    });
  },

  beforeUnmount() {
    this.newPhotos.forEach((photo) => {
      URL.revokeObjectURL(photo.url);
    });

    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  },

  methods: {
    // ==========================================
    // FETCH BOARDING HOUSE
    // ==========================================

    async fetchBoardingHouse() {
      this.isFetching = true;
      this.errorMessage = "";

      try {
        const id = this.$route.params.id;

        if (!id) {
          throw new Error("ID boarding house tidak ditemukan.");
        }

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Gagal mengambil data boarding house.",
          );
        }

        const house = data.boardingHouse;

        if (!house) {
          throw new Error("Data boarding house tidak ditemukan.");
        }

        // Basic information
        this.name = house.name || "";
        this.description = house.description || "";
        this.address = house.address || "";
        this.city = house.city || "";
        this.province = house.province || "";
        this.postalCode = house.postalCode || "";

        // Contact
        this.email = house.email || "";
        this.phone = house.phone || "";

        // Dynamic arrays
        this.rules = house.rules?.length ? [...house.rules] : [""];

        this.facilities = house.facilities?.length
          ? [...house.facilities]
          : [""];

        // Location
        this.location = {
          latitude: Number(house.location?.latitude),
          longitude: Number(house.location?.longitude),
        };

        // Status
        this.status = house.status || "ACTIVE";

        // Existing photos
        this.existingPhotos = (house.photos || []).map((path) => ({
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

    // ==========================================
    // PHOTO URL
    // ==========================================

    getPhotoUrl(path) {
      const normalizedPath = path.replace(/\\/g, "/");

      return `${SERVER_URL}/${normalizedPath}`;
    },

    // ==========================================
    // MAP
    // ==========================================

    initializeMap() {
      if (!this.$refs.map) return;

      const latitude = Number(this.location.latitude);
      const longitude = Number(this.location.longitude);

      const hasLocation =
        Number.isFinite(latitude) &&
        Number.isFinite(longitude) &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180;

      const centerLatitude = hasLocation ? latitude : -7.9666;
      const centerLongitude = hasLocation ? longitude : 112.6326;

      this.map = L.map(this.$refs.map).setView(
        [centerLatitude, centerLongitude],
        hasLocation ? 16 : 13,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(this.map);

      if (hasLocation) {
        this.createMarker(latitude, longitude);
      }

      this.map.on("click", (event) => {
        this.setLocation(event.latlng.lat, event.latlng.lng);
      });

      // Fix map sizing after component rendering
      setTimeout(() => {
        this.map?.invalidateSize();
      }, 100);
    },

    createMarker(latitude, longitude) {
      if (this.marker) {
        this.marker.setLatLng([latitude, longitude]);
        return;
      }

      this.marker = L.marker([latitude, longitude], {
        draggable: true,
      }).addTo(this.map);

      this.marker.on("dragend", (event) => {
        const position = event.target.getLatLng();

        this.location.latitude = Number(position.lat.toFixed(7));

        this.location.longitude = Number(position.lng.toFixed(7));
      });
    },

    setLocation(latitude, longitude) {
      this.location.latitude = Number(latitude.toFixed(7));
      this.location.longitude = Number(longitude.toFixed(7));

      this.createMarker(latitude, longitude);

      this.map.setView([latitude, longitude], 16);
    },

    updateMarkerFromInput() {
      const latitude = Number(this.location.latitude);
      const longitude = Number(this.location.longitude);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        return;
      }

      if (this.map) {
        this.setLocation(latitude, longitude);
      }
    },

    addRule() {
      this.rules.push("");
    },

    removeRule(index) {
      this.rules.splice(index, 1);
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
      if (
        !this.name ||
        !this.description ||
        !this.address ||
        !this.city ||
        !this.province ||
        !this.postalCode ||
        !this.email ||
        !this.phone
      ) {
        throw new Error("Semua informasi kostan wajib diisi.");
      }

      const latitude = Number(this.location.latitude);
      const longitude = Number(this.location.longitude);

      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        throw new Error("Lokasi latitude/longitude tidak valid.");
      }

      const parsedRules = this.rules.map((rule) => rule.trim()).filter(Boolean);

      if (parsedRules.length === 0) {
        throw new Error("Tambahkan minimal satu aturan kostan.");
      }

      const parsedFacilities = this.facilities
        .map((facility) => facility.trim())
        .filter(Boolean);

      if (parsedFacilities.length === 0) {
        throw new Error("Tambahkan minimal satu fasilitas kostan.");
      }

      if (this.totalPhotos === 0) {
        throw new Error("Minimal harus ada satu foto kostan.");
      }

      if (this.totalPhotos > 10) {
        throw new Error("Maksimal 10 foto kostan.");
      }

      if (!["ACTIVE", "INACTIVE"].includes(this.status)) {
        throw new Error("Status boarding house tidak valid.");
      }
    },

    async updateBoardingHouse() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        this.validateForm();

        const id = this.$route.params.id;

        const formData = new FormData();

        // Basic information
        formData.append("name", this.name);
        formData.append("description", this.description);
        formData.append("address", this.address);
        formData.append("city", this.city);
        formData.append("province", this.province);
        formData.append("postalCode", this.postalCode);

        // Contact
        formData.append("email", this.email);
        formData.append("phone", this.phone);

        // Rules
        const parsedRules = this.rules
          .map((rule) => rule.trim())
          .filter(Boolean);

        formData.append("rules", JSON.stringify(parsedRules));

        // Facilities
        const parsedFacilities = this.facilities
          .map((facility) => facility.trim())
          .filter(Boolean);

        formData.append("facilities", JSON.stringify(parsedFacilities));

        // Location
        formData.append(
          "location",
          JSON.stringify({
            latitude: Number(this.location.latitude),
            longitude: Number(this.location.longitude),
          }),
        );

        // Status
        formData.append("status", this.status);

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
          throw new Error(data.message || "Gagal memperbarui boarding house.");
        }

        this.successMessage = "Boarding house berhasil diperbarui!";

        // Redirect after successful update
        this.$router.push("/boardingHouses");
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
