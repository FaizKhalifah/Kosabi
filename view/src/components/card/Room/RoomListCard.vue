<template>
  <BaseCard title="Rooms">
    <div class="room-page">
      <div class="page-header">
        <div>
          <p class="page-description">
            Kelola dan lihat informasi ruangan pada kostan yang tersedia.
          </p>
        </div>

        <div class="total-badge">{{ rooms.length }} kamar</div>
      </div>
      <!-- Error state -->
      <div v-if="errorMessage" class="state-message error-state">
        <h3>Gagal memuat data</h3>
        <p>{{ errorMessage }}</p>

        <button
          type="button"
          class="retry-button"
          @click="fetchRooms"
          :disabled="isLoading"
        >
          {{ isLoading ? "Memuat..." : "Coba Lagi" }}
        </button>
      </div>

      <!-- Loading state -->
      <div v-else-if="isLoading" class="state-message">
        <div class="spinner"></div>
        <p>Memuat data kamar...</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="rooms.length === 0" class="state-message empty-state">
        <div class="empty-icon">⌂</div>
        <h3>Belum Ada Data Kamar</h3>
        <p>Saat ini belum ada kamar yang tersedia untuk ditampilkan.</p>
      </div>

      <div v-else class="table-container">
        <button class="addButton" @click="addRoom">Create New Room</button>
        <table>
          <thead>
            <tr>
              <th class="number-column">No.</th>
              <th>Foto</th>
              <th>Nomor Kamar</th>
              <th>Lantai</th>
              <th>Nama Kostan</th>
              <th>Penghuni</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Uang Muka</th>
              <th>Status</th>
              <th>Kapasitas</th>
              <th>Ukuran (m2)</th>
              <th>Fasilitas</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(room, index) in rooms" :key="room._id || index">
              <td class="number-column">
                {{ index + 1 }}
              </td>

              <td class="photo-cell">
                <div
                  v-if="Array.isArray(room.photos) && room.photos.length"
                  class="photo-gallery"
                >
                  <img
                    v-for="(photo, photoIndex) in room.photos"
                    :key="photoIndex"
                    :src="getPhotoUrl(photo)"
                    :alt="`Foto ${room.name} ${photoIndex + 1}`"
                    class="boarding-house-photo"
                    loading="lazy"
                  />
                </div>

                <span v-else class="no-photo"> Tidak ada foto </span>
              </td>

              <td class="room-number-cell">
                {{ displayValue(room.roomNumber) }}
              </td>

              <td class="floor-cell">
                {{ displayValue(room.floor) }}
              </td>

              <td class="boarding-house-name-cell">
                {{ displayValue(room.boardingHouse.name) }}
              </td>

              <td>
                {{ displayValue(room.occupant) }}
              </td>

              <td>
                {{ displayValue(room.type) }}
              </td>

              <td>
                {{ displayValue(room.price) }}
              </td>

              <td>
                {{ displayValue(room.deposit) }}
              </td>

              <td>
                <span class="status-badge" :class="getStatusClass(room.status)">
                  {{ displayValue(room.status) }}
                </span>
              </td>

              <td>
                {{ displayValue(room.capacity) }}
              </td>

              <td>
                {{ displayValue(room.size) }}
              </td>

              <td class="list-cell">
                {{ formatList(room.facilities) }}
              </td>

              <td>
                {{ displayValue(room.description) }}
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

      <div
        v-if="!isLoading && !errorMessage && rooms.length > 0"
        class="table-footer"
      >
        Menampilkan {{ rooms.length }} data kamar
      </div>
    </div>
  </BaseCard>
</template>
<style></style>
<script>
import BaseCard from "@/components/base/BaseCard.vue";
</script>
