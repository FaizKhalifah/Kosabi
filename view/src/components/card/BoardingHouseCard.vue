<template>
  <BaseCard title="Boarding Houses">
    <h1>Boarding houses</h1>
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Deskripsi</th>
          <th>Alamat</th>
          <th>Kota</th>
          <th>Provinsi</th>
          <th>Kode pos</th>
          <th>Email</th>
          <th>No telepon</th>
          <th>Aturan</th>
          <th>Fasilitas</th>
          <th>Lokasi</th>
          <th>Status</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="boardingHouse in boardingHouses" :key="boardingHouse._id">
          <td>{{ boardingHouse.name }}</td>
          <td>{{ boardingHouse.description }}</td>
          <td>{{ boardingHouse.address }}</td>
          <td>{{ boardingHouse.city }}</td>
          <td>{{ boardingHouse.province }}</td>
          <td>{{ boardingHouse.postalCode }}</td>
          <td>{{ boardingHouse.email }}</td>
          <td>{{ boardingHouse.phone }}</td>
          <td>{{ boardingHouse.rules }}</td>
          <td>{{ boardingHouse.facilities }}</td>
          <td>{{ boardingHouse.location }}</td>
          <td>{{ boardingHouse.status }}</td>
          <td>{{ boardingHouse.photos }}</td>
        </tr>
      </tbody>
    </table>
  </BaseCard>
</template>

<script>
import BaseCard from "../base/BaseCard.vue";

export default {
  name: "BoardingHouseCard",

  components: {
    BaseCard,
  },
  data() {
    return {
      boardingHouses: [],
    };
  },
  async created() {
    await this.fetchBoardingHouses();
    console.log("boarding houses" + this.boardingHouses);
  },
  methods: {
    async fetchBoardingHouses() {
      const response = await fetch("http://localhost:3001/api/boardingHouse", {
        method: "GET",
      });
      const responseData = await response.json();
      this.boardingHouses = responseData.boardingHouses;
    },
  },
};
</script>
