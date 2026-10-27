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
<style scoped>
.user-page {
  width: 100%;
  min-width: 0;
  color: #1f2937;
}

/* Header */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.page-description {
  margin: 0.5rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
}

.total-badge {
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  background-color: #eff6ff;
  color: #1d4ed8;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

/* Table */

.table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background-color: #ffffff;
}

table {
  width: 100%;
  min-width: 1250px;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  font-size: 0.875rem;
}

thead {
  background-color: #f8fafc;
}

th {
  padding: 1rem;
  color: #475569;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 1rem;
  color: #4b5563;
  line-height: 1.6;
  vertical-align: top;
  border-bottom: 1px solid #f1f5f9;
  overflow-wrap: anywhere;
  max-width: 240px;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f8fafc;
}

tbody tr:last-child td {
  border-bottom: none;
}

.number-column {
  width: 55px;
  text-align: center;
  color: #6b7280;
}

.name-cell {
  min-width: 150px;
  color: #111827;
  font-weight: 600;
}

.description-cell,
.list-cell {
  min-width: 160px;
}

/* Status badges */

.status-badge {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

.status-neutral {
  background-color: #f3f4f6;
  color: #4b5563;
}

/* Loading, empty and error states */

.state-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  padding: 2rem 1rem;
  text-align: center;
  border: 1px dashed #d1d5db;
  border-radius: 0.75rem;
  background-color: #fafafa;
}

.state-message h3 {
  margin: 0.75rem 0 0.5rem;
  color: #1f2937;
  font-size: 1.1rem;
}

.state-message p {
  max-width: 420px;
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.6;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: #475569;
  font-size: 2rem;
}

.error-state {
  border-color: #fecaca;
  background-color: #fffafa;
}

.error-state h3 {
  color: #b91c1c;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Buttons */

.retry-button {
  margin-top: 1rem;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-button:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.retry-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.addButton {
  cursor: pointer;
  margin: 2rem 1rem;
  background-color: #000000;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  color: white;
  border: 1px solid white;
  transition: 0.3s;
}

.addButton:hover {
  border-color: black;
  background-color: white;
  color: black;
}

/* Footer */

.table-footer {
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.8rem;
}

.actionButtons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.editButton,
.deleteButton {
  width: 5rem;
  text-align: center;
  color: white;
  margin: auto;
  border-radius: 0.5rem;
  border: 1px solid white;
  transition: 0.3s;
}

.editButton {
  background-color: orange;
}

.editButton:hover {
  background-color: white;
  color: orange;
  border-color: orange;
}

.deleteButton {
  background-color: red;
}

.deleteButton:hover {
  background-color: white;
  color: red;
  border-color: red;
}

/* Photo gallery */

.photo-cell {
  min-width: 180px;
  max-width: 250px;
}

.photo-gallery {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.room-photo {
  width: 65px;
  height: 65px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease;
}

.room-photo:hover {
  transform: scale(1.1);
}

.no-photo {
  color: #9ca3af;
  font-size: 0.8rem;
  font-style: italic;
}

/* Small screens */

@media (max-width: 640px) {
  .page-header h1 {
    font-size: 1.25rem;
  }

  .state-message {
    min-height: 200px;
    padding: 1.5rem 1rem;
  }
}
</style>
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

        console.log("Response fetch : ", response);

        if (!response.ok) {
          throw new Error(`Server mengembalikan status ${response.status}.`);
        }

        const responseData = await response.json();

        if (!Array.isArray(responseData.data?.users)) {
          throw new Error("Format data dari server tidak sesuai.");
        }

        this.users = responseData.data.users;
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
