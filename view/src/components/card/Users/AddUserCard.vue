<template>
  <BaseCard>
    <form>
      <h2>Tambah User</h2>
      <div class="form-group">
        <label>Nama</label>
        <input
          v-model.trim="name"
          type="text"
          placeholder="Contoh: Faiz Khalifah"
          required
        />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          v-model.trim="email"
          type="text"
          placeholder="Contoh: FaizKhalifah@gmail.com"
          required
        />
      </div>
      <div class="form-group">
        <label>Nomor Telepon</label>
        <input
          v-model.trim="phone"
          type="text"
          placeholder="Contoh: 0897xxxxx"
          required
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model.trim="password"
          type="text"
          placeholder="Contoh: k*as1h3j5b2"
          required
        />
      </div>
      <div class="form-group">
        <label>Role</label>
        <select v-model="role" required>
          <option value="" disabled>Pilih role user</option>
          <option value="ADMIN">Admin</option>
          <option value="TENANT">Tenant</option>
        </select>
        />
      </div>
      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>

      <!-- SUBMIT -->
      <button type="submit" class="submit-button" :disabled="isLoading">
        {{ isLoading ? "Menyimpan..." : "Tambah User" }}
      </button>
    </form>
  </BaseCard>
</template>
<script>
import BaseCard from "@/components/base/BaseCard.vue";
</script>
