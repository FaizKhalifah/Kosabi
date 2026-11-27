<script src="script.js"></script>
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

        <!-- Foto lama -->
        <h4>Foto Saat Ini</h4>

        <div v-if="existingPhotos.length > 0" class="preview-container">
          <div
            v-for="(photo, index) in existingPhotos"
            :key="photo.path"
            class="preview-item"
          >
            <img :src="photo.url" alt="Foto ruangan" />

            <button
              type="button"
              class="remove-button"
              @click="removeExistingPhoto(index)"
            >
              Hapus
            </button>
          </div>
        </div>

        <!-- Foto baru -->
        <h4>Foto Baru</h4>

        <div v-if="newPhotos.length > 0" class="preview-container">
          <div
            v-for="(photo, index) in newPhotos"
            :key="photo.id"
            class="preview-item"
          >
            <img :src="photo.url" alt="Foto baru" />

            <button
              type="button"
              class="remove-button"
              @click="removeNewPhoto(index)"
            >
              Hapus
            </button>
          </div>
        </div>

        <p>Total foto: {{ totalPhotos }} / 10</p>
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
        {{ isLoading ? "Menyimpan..." : "Update ruangan" }}
      </button>
    </form>
  </BaseCard>
</template>

<style scoped src="style.css"></style>
