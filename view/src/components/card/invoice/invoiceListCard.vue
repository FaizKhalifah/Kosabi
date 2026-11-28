<template>
  <BaseCard title="Invoices">
    <div class="invoice-page">
      <div class="page-header">
        <div>
          <p class="page-description">
            Kelola dan lihat informasi invoice yang tersedia.
          </p>
        </div>

        <div class="total-badge">{{ invoices.length }} Invoice</div>
      </div>
      <div class="filter-container">
        <div class="sorting-controls">
          <label for="sortBy">Urutkan berdasarkan:</label>

          <select id="sortBy" v-model="sortBy" @change="fetchInvoices">
            <option value="rental">ID rental</option>
            <option value="invoiceNumber">Nomor invoice</option>
            <option value="month">Bulan</option>
            <option value="amount">Jumlah</option>
            <option value="lateFee">Biaya tambahan</option>
            <option value="dueDate">Tenggat waktu</option>
          </select>

          <select v-model="sortOrder" @change="fetchInvoices">
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
          @click="fetchInvoices"
          :disabled="isLoading"
        >
          {{ isLoading ? "Memuat..." : "Coba Lagi" }}
        </button>
      </div>

      <!-- Loading state -->
      <div v-else-if="isLoading" class="state-message">
        <div class="spinner"></div>
        <p>Memuat data invoice...</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="invoices.length === 0" class="state-message empty-state">
        <div class="empty-icon">⌂</div>
        <h3>Belum Ada Data invoice</h3>
        <p>Saat ini belum ada invoice yang tersedia untuk ditampilkan.</p>
      </div>
    </div>
  </BaseCard>
</template>
<script></script>
<style></style>
