<template>
  <BaseCard title="rentals">
    <div class="rental-page">
      <div class="page-header">
        <div>
          <p class="page-description">
            Kelola dan lihat informasi penyewaan pada kostan yang tersedia.
          </p>
        </div>

        <div class="total-badge">{{ rentals.length }} rental</div>
      </div>
      <div class="filter-container">
        <form class="search-form" @submit.prevent="fetchRentals">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari tanggal mulai, tanggal selesai..."
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

          <select id="sortBy" v-model="sortBy" @change="fetchRentals">
            <option value="startDate">Tanggal Mulai</option>
            <option value="endDate">Tanggal Selesai</option>
            <option value="billingDay">Hari Tagihan</option>
            <option value="status">status</option>
          </select>

          <select v-model="sortOrder" @change="fetchRentals">
            <option value="asc">Ascending (A-Z)</option>
            <option value="desc">Descending (Z-A)</option>
          </select>
        </div>
      </div>
      <div v-if="errorMessage" class="state-message error-state">
        <h3>Gagal memuat data</h3>
        <p>{{ errorMessage }}</p>

        <button
          type="button"
          class="retry-button"
          @click="fetchRentals"
          :disabled="isLoading"
        >
          {{ isLoading ? "Memuat..." : "Coba Lagi" }}
        </button>
      </div>

      <!-- Loading state -->
      <div v-else-if="isLoading" class="state-message">
        <div class="spinner"></div>
        <p>Memuat data rental...</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="rentals.length === 0" class="state-message empty-state">
        <div class="empty-icon">⌂</div>
        <h3>Belum Ada Data Rental</h3>
        <p>Saat ini belum ada Rental yang tersedia untuk ditampilkan.</p>
      </div>

      <div v-else class="table-container">
        <button class="addButton" @click="addRental">Create New Rental</button>
        <table>
          <thead>
            <tr>
              <th class="number-column">No.</th>
              <th>Tenant</th>
              <th>Ruangan</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Selesai</th>
              <th>Harga per bulan</th>
              <th>Deposit</th>
              <th>Billing Day</th>
              <th>Status</th>
              <th>catatan</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(rental, index) in rentals" :key="rental._id || index">
              <td class="number-column">
                {{ index + 1 }}
              </td>

              <td>
                {{ displayValue(rental.tenant?.name) }}
              </td>

              <td class="room-number-cell">
                {{ displayValue(rental.room.roomNumber) }}
              </td>

              <td>
                {{ formatDate(rental.startDate) }}
              </td>

              <td>
                {{ formatDate(rental.endDate) }}
              </td>

              <td>
                {{ displayValue(rental.monthlyPrice) }}
              </td>

              <td>
                {{ displayValue(rental.deposit) }}
              </td>

              <td>
                {{ displayValue(rental.billingDay) }}
              </td>

              <td>
                <span
                  class="status-badge"
                  :class="getStatusClass(rental.status)"
                >
                  {{ displayValue(rental.status) }}
                </span>
              </td>

              <td>
                {{ displayValue(rental.notes) }}
              </td>

              <td class="actionButtons">
                <button @click="editRental(rental._id)" class="editButton">
                  Edit
                </button>
                <button @click="deleteRental(rental._id)" class="deleteButton">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </BaseCard>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
