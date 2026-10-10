<template>
  <BaseCard>
    <form action="">
      <div>
        <label>Nama kostan</label>
        <input v-model="name" placeholder="Nama" required />
      </div>
      <div>
        <label>Deskripsi</label>
        <input v-model="description" placeholder="Deskripsi" required />
      </div>
      <div>
        <label>Alamat</label>
        <input v-model="address" placeholder="Alamat" required />
      </div>
      <div>
        <label>Kota</label>
        <input v-model="city" placeholder="kota" required />
      </div>
      <div>
        <label>Provinsi</label>
        <input v-model="province" placeholder="provinsi" required />
      </div>
      <div>
        <label>Kode pos</label>
        <input v-model="postalCode" placeholder="Kode pos" required />
      </div>
      <div>
        <label>Email kostan</label>
        <input v-model="email" placeholder="email" required />
      </div>
      <div>
        <label>Nomor telepon kostan</label>
        <input v-model="phone" placeholder="No telepon" required />
      </div>
      <div>
        <label>Aturan</label>
        <input v-model="rules" placeholder="Aturan" required />
      </div>
      <div>
        <label>Fasilitas</label>
        <input v-model="facitlities" placeholder="Nama" required />
      </div>
      <div>
        <label>Lokasi kos</label>
        <input v-model="location" placeholder="lokasi" required />
      </div>
      <div>
        <label>Status</label>
        <input v-model="status" placeholder="status" required />
      </div>
      <div>
        <label>Foto kostan</label>
        <input v-model="photos" placeholder="Foto" required />
      </div>
    </form>
  </BaseCard>
</template>
<style></style>
<script>
import BaseCard from "@/components/base/BaseCard.vue";
export default {
  name: "AddBoardingHouseCard",
  components: {
    BaseCard,
  },
  methods: {
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
      if (this.imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imageBase64 = reader.result.split(",")[1]; // Remove the "data:image/jpeg;base64," prefix
        };
        reader.readAsDataURL(this.imageFile); // Convert image to Base64
      }
    },
    async addBoardingHouse() {
      try {
        const formData = new FormData();
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
  },
};
</script>
