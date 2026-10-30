<template>
  <BaseCard>
    <form @submit.prevent="addUser">
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
  name: "AddUserCard",
  components: {
    BaseCard,
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "TENANT",
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
    validateForm() {
      if (!this.name) {
        throw new Error("Nama diperlukan untuk membuat user baru");
      }
      if (!this.email) {
        throw new Error("Email diperlukan untuk membuat user baru");
      }
      if (!this.phone) {
        throw new Error("No telepon diperlukan untuk membuat user baru");
      }
      if (!this.password) {
        throw new Error("Password diperlukan untuk membuat user baru");
      }
      if (!["TENANT", "ADMIN"].includes(this.role)) {
        throw new Error("Role user tidak valid");
      }
    },

    async addUser() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";
      try {
        this.validateForm();

        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("password", this.password);
        formData.append("role", this.role);
        const response = await fetch("http://localhost:3001/api/user/", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menambahkan ruangan.");
        }

        this.successMessage = "Ruangan berhasil ditambahkan!";

        this.$router.push("/users");
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
