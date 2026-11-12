<template>
  <BaseCard>
    <form>
      <h2>Tambah Rental</h2>
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
      <div class="form-group">
        <label>Nomor ruangan</label>

        <select v-model="roomNumber" required>
          <option value="" disabled>Pilih Nomor ruangan</option>

          <option v-for="room in rooms" :key="room._id" :value="room._id">
            {{ room.roomNumber }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Tanggal Mulai</label>
        <input v-model="startDate" type="date" required />
      </div>
      <div class="form-group">
        <label>Tanggal Selesai</label>
        <input v-model="endDate" type="date" required />
      </div>
      <div class="form-group">
        <label>Harga per bulan</label>
        <input
          v-model="monthlyPrice"
          type="number"
          min="1"
          placeholder="Contoh: 1300000"
          required
        />
      </div>
      <div class="form-group">
        <label>Deposit</label>
        <input
          v-model.number="deposit"
          type="number"
          min="1"
          placeholder="Contoh: 300000"
          required
        />
      </div>
      <div class="form-group">
        <label>Billing Day</label>
        <input
          v-model="billingDay"
          type="number"
          min="1"
          placeholder="Contoh: 10"
          required
        />
      </div>
      <div class="form-group">
        <label>Status</label>

        <select v-model="status" required>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="FINISHED">FINISHED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      <div class="form-group">
        <label>Catatan</label>
        <input v-model="notes" type="text" required />
      </div>
    </form>
  </BaseCard>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
