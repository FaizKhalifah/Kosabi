<template>
  <div class="flex min-h-[70vh] items-center justify-center">
    <div class="text-center">
      <p class="text-6xl font-bold text-slate-200">404</p>

      <h1 class="mt-4 text-xl font-semibold text-slate-900">
        Halaman tidak ditemukan
      </h1>

      <p class="mt-2 text-sm text-slate-500">
        Halaman yang kamu cari tidak tersedia.
      </p>

      <RouterLink
        to="/"
        class="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
      >
        <i class="pi pi-arrow-left" />
        Kembali ke Dashboard
      </RouterLink>
    </div>
  </div>
</template>
