<template>
  <BaseCard title="Boarding Houses">
    <div class="boarding-house-page">
      <div class="page-header">
        <div>
          <p class="page-description">
            Kelola dan lihat informasi kostan yang tersedia.
          </p>
        </div>

        <div class="total-badge">{{ boardingHouses.length }} kostan</div>
      </div>

      <!-- Search & Sorting Controls -->
      <div class="filter-container">
        <form class="search-form" @submit.prevent="fetchBoardingHouses">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama kostan, kota, alamat..."
            class="search-input"
          />
          <div class="searchFormButtons">
            <button type="submit" class="search-button" :disabled="isLoading">
              Cari
            </button>

            <button
              type="button"
              class="reset-button"
              @click="resetFilters"
              :disabled="isLoading"
            >
              Reset
            </button>
          </div>
        </form>

        <div class="sorting-controls">
          <label for="sortBy">Urutkan berdasarkan:</label>

          <select id="sortBy" v-model="sortBy" @change="fetchBoardingHouses">
            <option value="createdAt">Tanggal dibuat</option>
            <option value="name">Nama kostan</option>
            <option value="city">Kota</option>
            <option value="province">Provinsi</option>
          </select>

          <select v-model="sortOrder" @change="fetchBoardingHouses">
            <option value="asc">Ascending (A-Z)</option>
            <option value="desc">Descending (Z-A)</option>
          </select>
        </div>
      </div>

      <!-- Error state -->
      <div v-if="errorMessage" class="state-message error-state">
        <h3>Gagal memuat data</h3>
        <p>{{ errorMessage }}</p>

        <button
          type="button"
          class="retry-button"
          @click="fetchBoardingHouses"
          :disabled="isLoading"
        >
          {{ isLoading ? "Memuat..." : "Coba Lagi" }}
        </button>
      </div>

      <!-- Loading state -->
      <div v-else-if="isLoading" class="state-message">
        <div class="spinner"></div>
        <p>Memuat data kostan...</p>
      </div>

      <!-- Empty state -->
      <div
        v-else-if="boardingHouses.length === 0"
        class="state-message empty-state"
      >
        <div class="empty-icon">⌂</div>

        <template v-if="searchQuery">
          <h3>Data Tidak Ditemukan</h3>
          <p>Tidak ditemukan kostan dengan kata kunci "{{ searchQuery }}".</p>
        </template>

        <template v-else>
          <h3>Belum Ada Data Kostan</h3>
          <p>Saat ini belum ada kostan yang tersedia untuk ditampilkan.</p>
        </template>
      </div>

      <!-- Data table -->
      <div v-else class="table-container">
        <button class="addButton" @click="addBoardingHouse">
          Create New Boarding House
        </button>
        <table>
          <thead>
            <tr>
              <th class="number-column">No.</th>
              <th>Foto</th>
              <th>Nama Kostan</th>
              <th>Deskripsi</th>
              <th>Alamat</th>
              <th>Kota</th>
              <th>Provinsi</th>
              <th>Kode Pos</th>
              <th>Email</th>
              <th>No. Telepon</th>
              <th>Aturan</th>
              <th>Fasilitas</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(boardingHouse, index) in boardingHouses"
              :key="boardingHouse._id || index"
            >
              <td class="number-column">
                {{ index + 1 }}
              </td>

              <td class="photo-cell">
                <div
                  v-if="
                    Array.isArray(boardingHouse.photos) &&
                    boardingHouse.photos.length
                  "
                  class="photo-gallery"
                >
                  <img
                    v-for="(photo, photoIndex) in boardingHouse.photos"
                    :key="photoIndex"
                    :src="getPhotoUrl(photo)"
                    :alt="`Foto ${boardingHouse.name} ${photoIndex + 1}`"
                    class="boarding-house-photo"
                    loading="lazy"
                  />
                </div>

                <span v-else class="no-photo"> Tidak ada foto </span>
              </td>

              <td class="name-cell">
                {{ displayValue(boardingHouse.name) }}
              </td>

              <td class="description-cell">
                {{ displayValue(boardingHouse.description) }}
              </td>

              <td>
                {{ displayValue(boardingHouse.address) }}
              </td>

              <td>
                {{ displayValue(boardingHouse.city) }}
              </td>

              <td>
                {{ displayValue(boardingHouse.province) }}
              </td>

              <td>
                {{ displayValue(boardingHouse.postalCode) }}
              </td>

              <td>
                {{ displayValue(boardingHouse.email) }}
              </td>

              <td>
                {{ displayValue(boardingHouse.phone) }}
              </td>

              <td class="list-cell">
                {{ formatList(boardingHouse.rules) }}
              </td>

              <td class="list-cell">
                {{ formatList(boardingHouse.facilities) }}
              </td>

              <td>
                <span
                  class="status-badge"
                  :class="getStatusClass(boardingHouse.status)"
                >
                  {{ displayValue(boardingHouse.status) }}
                </span>
              </td>
              <td class="actionButtons">
                <button
                  @click="editBoardingHouse(boardingHouse._id)"
                  class="editButton"
                >
                  Edit
                </button>
                <button
                  @click="deleteBoardingHouse(boardingHouse._id)"
                  class="deleteButton"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div
        v-if="!isLoading && !errorMessage && boardingHouses.length > 0"
        class="table-footer"
      >
        Menampilkan {{ boardingHouses.length }} data kostan
      </div>
    </div>
  </BaseCard>
</template>

<style scoped src="style.css"></style>
<script src="script.js"></script>
