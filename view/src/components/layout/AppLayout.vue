<script setup>
import { ref } from "vue";

import AppSidebar from "./AppSidebar.vue";
import AppNavbar from "./AppNavbar.vue";

const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppSidebar :open="sidebarOpen" @close="closeSidebar" />

    <div class="min-h-screen lg:pl-64">
      <AppNavbar @toggle-sidebar="toggleSidebar" />

      <main class="p-4 sm:p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
