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
        <input v-model="facilities" placeholder="Nama" required />
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
      <button type="submit">Tambah Boarding House</button>
    </form>
  </BaseCard>
</template>
<style scoped>
form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
}

form div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  width: 30rem;
  border-bottom: 1px solid black;
}

button {
  cursor: pointer;
  margin-top: 2rem;
  width: 15rem;
  padding: 0.5rem;
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 2rem;
  transition: 0.3s;
}

button:hover {
  background-color: white;
  border-color: black;
  color: black;
}
</style>
<script>
import BaseCard from "@/components/base/BaseCard.vue";
export default {
  name: "AddBoardingHouseCard",
  data() {
    return {
      name: "",
      description: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      email: "",
      phone: "",
      rules: "",
      facilities: "",
      location: "",
      status: "",
      photos: "",
    };
  },
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
        formData.append("name", this.name);
        formData.append("description", this.description);
        formData.append("address", this.address);
        formData.append("city", this.city);
        formData.append("province", this.province);
        formData.append("postalCode", this.postalCode);
        formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("rules", this.rules);
        formData.append("facilites", this.facilities);
        formData.append("location", this.location);
        formData.append("status", this.status);
        if (this.photos) {
          formData.append("photos", this.photos);
        }
        const response = await fetch(
          "http://localhost:3001/api/boardingHouse/",
          {
            method: "POST",
            body: formData, // Gunakan FormData
          },
        );

        const data = await response.json();
      } catch (error) {
        console.error("Error adding book:", error);
      }
    },
  },
};
</script>
