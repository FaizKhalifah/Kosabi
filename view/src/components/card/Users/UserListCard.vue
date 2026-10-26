<template>
  <BaseCard title="Users">
    <div class="user-page">
      <div class="page-header">
        <div>
          <p class="page-description">
            Kelola dan lihat informasi pengguna yang tersedia.
          </p>
        </div>
        <div class="total-badge">pengguna</div>
      </div>
      <div class="filter-container">
        <div class="sorting-controls">
          <label for="sortBy">Urutkan berdasarkan:</label>

          <select id="sortBy" v-model="sortBy" @change="fetchUsers">
            <option value="name">Nama User</option>
            <option value="email">Email User</option>
          </select>
        </div>
      </div>
      <div v-if="errorMessage" class="state-message error-state">
        <h3>Gagal memuat data</h3>
        <p>{{ errorMessage }}</p>

        <button
          type="button"
          class="retry-button"
          @click="fetchUsers"
          :disabled="isLoading"
        >
          {{ isLoading ? "Memuat..." : "Coba Lagi" }}
        </button>
      </div>

      <div v-else-if="isLoading" class="state-message">
        <div class="spinner"></div>
        <p>Memuat data User...</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="users.length === 0" class="state-message empty-state">
        <div class="empty-icon">⌂</div>
        <h3>Belum Ada Data User</h3>
        <p>Saat ini belum ada user yang tersedia untuk ditampilkan.</p>
      </div>

      <div v-else class="table-container">
        <button class="addButton" @click="addUser">Create New User</button>
        <table>
          <thead>
            <tr>
              <th class="number-column">No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>No Telepon</th>
              <th>Role</th>
              <th>isActive</th>
              <th>Last login</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(user, index) in users" :key="user._id || index">
              <td class="number-column">
                {{ index + 1 }}
              </td>

              <td class="">
                {{ displayValue(user.name) }}
              </td>

              <td class="">
                {{ displayValue(user.email) }}
              </td>

              <td class="">
                {{ displayValue(user.phone) }}
              </td>

              <td>
                {{ displayValue(user.role) }}
              </td>

              <td>
                {{ displayValue(user.isActive) }}
              </td>

              <td>
                {{ displayValue(user.lastLogin) }}
              </td>

              <td class="actionButtons">
                <button @click="editRoom(user._id)" class="editButton">
                  Edit
                </button>
                <button @click="deleteRoom(user._id)" class="deleteButton">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="!isLoading && !errorMessage && users.length > 0"
        class="table-footer"
      >
        Menampilkan {{ users.length }} data user
      </div>
    </div>
  </BaseCard>
</template>
<script>
import BaseCard from "@/components/base/BaseCard.vue";
export default {
  name: "UserListCard",
  components: {
    BaseCard,
  },
  data() {
    return {
      users: [],
      isLoading: false,
      errorMessage: "",

      sortBy: "createdAt",
      sortOrder: "desc",
    };
  },

  created() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      this.isLoading = true;
      this.errorMessage = "";

      const params = new URLSearchParams({
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });

      try {
        const response = await fetch(
          `http://localhost:3001/api/users?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Server mengembalikan status ${response.status}.`);
        }

        const responseData = await response.json();

        if (!Array.isArray(responseData.users)) {
          throw new Error("Format data dari server tidak sesuai.");
        }

        this.users = responseData.users;
      } catch (error) {
        console.error("Gagal mengambil data user:", error);

        this.errorMessage =
          "Data ruangan tidak dapat dimuat. Periksa koneksi ke server, lalu coba lagi.";
      } finally {
        this.isLoading = false;
      }
    },

    resetFilters() {
      this.sortBy = "createdAt";
      this.sortOrder = "desc";
      this.fetchUsers();
    },

    displayValue(value) {
      if (value === null || value === undefined || value === "") {
        return "-";
      }

      return value;
    },

    addUser() {
      this.$router.push("/users/add");
    },

    editUser(id) {
      this.$router.push(`/users/edit/${id}`);
    },

    async deleteUser(id) {
      await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
      });
      this.fetchUsers();
    },
  },
};
</script>
