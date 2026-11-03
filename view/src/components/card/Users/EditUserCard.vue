<template>
  <BaseCard>
    <form>
      <h2>Edit User</h2>
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
          type="email"
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
      </div>
      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>

      <!-- SUBMIT -->
      <button type="submit" class="submit-button" :disabled="isLoading">
        {{ isLoading ? "Menyimpan..." : "Update User" }}
      </button>
    </form>
  </BaseCard>
</template>
<script>
import BaseCard from "@/components/base/BaseCard.vue";
const API_URL = "http://localhost:3001/api/user";
const SERVER_URL = "http://localhost:3001";
export default {
  name: "EditUserCard",
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
      isFetching: false,
      isLoading: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  async mounted() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      this.isFetching = true;
      this.errorMessage = "";
      try {
        const id = this.$route.params.id;

        if (!id) {
          throw new Error("ID ruangan tidak ditemukan.");
        }

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data user.");
        }
        const user = data.user;
        this.name = user.name;
        this.email = user.email;
        this.phone = user.phone;
        this.password = user.password;
        this.role = user.role;
        if (!user) {
          throw new Error("Data ruangan tidak ditemukan.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        this.errorMessage = error.message;
      } finally {
        this.isFetching = false;
      }
    },

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

    async editUser() {
      this.isLoading = true;
      this.errorMessage = "";
      this.successMessage = "";
      try {
        this.validateForm();
        const id = this.$route.params.id;
        const payload = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
          role: this.role,
        };
        const response = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengedit user.");
        }
        this.successMessage = "User berhasil diperbarui!";
        this.$router.push("/users");
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
