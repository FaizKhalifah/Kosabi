<template>
  <BaseCard>
    <form @submit.prevent="addBoardingHouse">
      <h2>Tambah Boarding House</h2>

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
          Klik pada peta untuk menentukan lokasi boarding house.
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

        <div class="form-group">
          <label>Upload Foto Kostan</label>

          <input
            type="file"
            accept="image/*"
            multiple
            @change="handleImageUpload"
          />

          <p class="helper-text">
            Maksimal 10 foto. Format gambar JPG, PNG, atau WEBP.
          </p>
        </div>

        <div v-if="previewUrls.length > 0" class="preview-container">
          <div
            v-for="(url, index) in previewUrls"
            :key="url"
            class="preview-item"
          >
            <img :src="url" alt="Preview foto kostan" />

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
        {{ isLoading ? "Menyimpan..." : "Tambah Boarding House" }}
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

// Fix default marker icon pada Leaflet + Vue bundler
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default {
  name: "AddBoardingHouseCard",

  components: {
    BaseCard,
  },

  data() {
    return {
      name: "",
      description: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      email: "",
      phone: "",

      rules: [""],
      facilities: [""],

      location: {
        latitude: null,
        longitude: null,
      },

      status: "ACTIVE",

      photos: [],
      previewUrls: [],

      map: null,
      marker: null,

      isLoading: false,
      errorMessage: "",
      successMessage: "",
    };
  },

  mounted() {
    this.initializeMap();
  },

  beforeUnmount() {
    this.previewUrls.forEach((url) => {
      URL.revokeObjectURL(url);
    });

    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  },

  methods: {
    initializeMap() {
      // Default map center: Malang
      const defaultLatitude = -7.9666;
      const defaultLongitude = 112.6326;

      this.map = L.map(this.$refs.map).setView(
        [defaultLatitude, defaultLongitude],
        13,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(this.map);

      // Click map to select location
      this.map.on("click", (event) => {
        this.setLocation(event.latlng.lat, event.latlng.lng);
      });
    },

    setLocation(latitude, longitude) {
      this.location.latitude = Number(latitude.toFixed(7));
      this.location.longitude = Number(longitude.toFixed(7));

      if (this.marker) {
        this.marker.setLatLng([latitude, longitude]);
      } else {
        this.marker = L.marker([latitude, longitude], {
          draggable: true,
        }).addTo(this.map);

        // Update coordinates when marker is dragged
        this.marker.on("dragend", (event) => {
          const position = event.target.getLatLng();

          this.location.latitude = Number(position.lat.toFixed(7));

          this.location.longitude = Number(position.lng.toFixed(7));
        });
      }

      this.map.setView([latitude, longitude], 16);
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

      if (files.length === 0) {
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      // Validasi jumlah foto
      if (this.photos.length + files.length > 10) {
        this.errorMessage = "Maksimal 10 foto.";
        event.target.value = "";
        return;
      }

      // Validasi format dan ukuran
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

      // Simpan file ke state
      this.photos = [...this.photos, ...files];

      // Buat preview
      const newPreviews = files.map((file) => URL.createObjectURL(file));

      this.previewUrls = [...this.previewUrls, ...newPreviews];

      console.log("Selected photos:", this.photos);
      console.log("Total photos:", this.photos.length);

      // Reset input supaya file yang sama bisa dipilih kembali
      event.target.value = "";
    },

    removePhoto(index) {
      URL.revokeObjectURL(this.previewUrls[index]);

      this.photos = this.photos.filter((_, i) => i !== index);

      this.previewUrls = this.previewUrls.filter((_, i) => i !== index);
    },

    validateForm() {
      if (!this.name || !this.email || !this.phone) {
        throw new Error("Nama, email, dan nomor telepon wajib diisi.");
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

      if (this.rules.filter((rule) => rule.trim()).length === 0) {
        throw new Error("Tambahkan minimal satu aturan kostan.");
      }

      if (this.facilities.filter((facility) => facility.trim()).length === 0) {
        throw new Error("Tambahkan minimal satu fasilitas kostan.");
      }

      if (this.photos.length === 0) {
        throw new Error("Upload minimal satu foto kostan.");
      }

      if (this.photos.length > 10) {
        throw new Error("Maksimal 10 foto kostan.");
      }
    },

    async addBoardingHouse() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        this.validateForm();

        const formData = new FormData();

        // Basic information
        formData.append("name", this.name);
        formData.append("description", this.description);
        formData.append("address", this.address);
        formData.append("city", this.city);
        formData.append("province", this.province);
        formData.append("postalCode", this.postalCode);
        formData.append("email", this.email);
        formData.append("phone", this.phone);

        // Rules array
        const parsedRules = this.rules
          .map((rule) => rule.trim())
          .filter(Boolean);

        formData.append("rules", JSON.stringify(parsedRules));

        // Facilities array
        const parsedFacilities = this.facilities
          .map((facility) => facility.trim())
          .filter(Boolean);

        formData.append("facilities", JSON.stringify(parsedFacilities));

        // Location object
        formData.append(
          "location",
          JSON.stringify({
            latitude: Number(this.location.latitude),
            longitude: Number(this.location.longitude),
          }),
        );
        // Status
        formData.append("status", this.status);

        // Multiple photos
        this.photos.forEach((photo) => {
          formData.append("photos", photo);
        });

        // Request backend
        const response = await fetch(
          "http://localhost:3001/api/boardingHouse/",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menambahkan boarding house.");
        }

        this.successMessage = "Boarding house berhasil ditambahkan!";
        this.$router.push("/boardingHouses");
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
