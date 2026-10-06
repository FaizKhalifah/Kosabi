<script setup>
import { ref } from "vue";
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-vue-next";

defineEmits(["toggle-sidebar"]);

const profileOpen = ref(false);
</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6"
  >
    <!-- Left -->
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
        @click="$emit('toggle-sidebar')"
      >
        <Menu :size="20" />
      </button>

      <div>
        <p class="text-sm font-semibold text-slate-900">Dashboard</p>

        <p class="hidden text-xs text-slate-500 sm:block">Overview</p>
      </div>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-2">
      <!-- Notification -->
      <button
        type="button"
        class="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
      >
        <Bell :size="18" />

        <span
          class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"
        />
      </button>

      <div class="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

      <!-- Profile -->
      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100"
          @click="profileOpen = !profileOpen"
        >
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white"
          >
            A
          </div>

          <div class="hidden text-left sm:block">
            <p class="text-sm font-medium text-slate-900">Admin</p>

            <p class="text-xs text-slate-500">Administrator</p>
          </div>

          <ChevronDown :size="15" class="hidden text-slate-400 sm:block" />
        </button>

        <!-- Dropdown -->
        <div
          v-if="profileOpen"
          class="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
        >
          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            <User :size="16" />
            Profile
          </button>

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            <Settings :size="16" />
            Settings
          </button>

          <div class="my-1 border-t border-slate-100" />

          <button
            type="button"
            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut :size="16" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
