<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import {
  Home,
  Building2,
  LucideBuilding,
  Wallet,
  BarChart3,
  ChevronDown,
  ChevronUp,
  DoorOpen,
  Users,
  CreditCard,
  Receipt,
  X,
  Building,
} from "lucide-vue-next";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const route = useRoute();

const expandedMenus = ref({
  property: true,
  finance: true,
});

const navigation = [
  {
    label: "Dashboard",
    icon: Home,
    to: "/",
  },
  {
    label: "Kos",
    icon: Building2,
    key: "property",
    children: [
      {
        label: "Kostan",
        icon: Building,
        to: "/boardingHouses",
      },
      {
        label: "Kamar",
        icon: DoorOpen,
        to: "/rooms",
      },
      {
        label: "Penghuni",
        icon: Users,
        to: "/tenants",
      },
    ],
  },
  {
    label: "Keuangan",
    icon: Wallet,
    key: "finance",
    children: [
      {
        label: "Pembayaran",
        icon: CreditCard,
        to: "/payments",
      },
      {
        label: "Pengeluaran",
        icon: Receipt,
        to: "/expenses",
      },
    ],
  },
  {
    label: "Laporan",
    icon: BarChart3,
    to: "/reports",
  },
];

function toggleMenu(key) {
  expandedMenus.value[key] = !expandedMenus.value[key];
}

function isActive(path) {
  return route.path === path;
}
</script>

<template>
  <!-- Mobile overlay -->
  <Transition name="fade">
    <div
      v-if="props.open"
      class="fixed inset-0 z-40 bg-black/40 lg:hidden"
      @click="emit('close')"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0"
    :class="props.open ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Header -->
    <div
      class="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5"
    >
      <RouterLink to="/" class="flex items-center gap-3" @click="emit('close')">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white"
        >
          K
        </div>

        <div>
          <p class="text-sm font-semibold text-slate-900">KosManager</p>

          <p class="text-xs text-slate-500">Management System</p>
        </div>
      </RouterLink>

      <!-- Mobile close -->
      <button
        type="button"
        class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
        @click="emit('close')"
      >
        <X :size="18" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4">
      <p
        class="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400"
      >
        Menu
      </p>

      <div class="space-y-1">
        <template v-for="item in navigation" :key="item.label">
          <!-- Single menu -->
          <RouterLink
            v-if="!item.children"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            :class="
              isActive(item.to)
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            "
            @click="emit('close')"
          >
            <component :is="item.icon" :size="18" :stroke-width="1.8" />

            <span>{{ item.label }}</span>
          </RouterLink>

          <!-- Parent menu -->
          <div v-else>
            <button
              type="button"
              class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              @click="toggleMenu(item.key)"
            >
              <span class="flex items-center gap-3">
                <component :is="item.icon" :size="18" :stroke-width="1.8" />

                <span>{{ item.label }}</span>
              </span>

              <ChevronUp v-if="expandedMenus[item.key]" :size="15" />

              <ChevronDown v-else :size="15" />
            </button>

            <!-- Children -->
            <div
              v-if="expandedMenus[item.key]"
              class="mt-1 ml-3 space-y-1 border-l border-slate-200 pl-3"
            >
              <RouterLink
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
                :class="
                  isActive(child.to)
                    ? 'bg-slate-100 font-medium text-slate-900'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                "
                @click="emit('close')"
              >
                <component :is="child.icon" :size="16" :stroke-width="1.8" />

                <span>{{ child.label }}</span>
              </RouterLink>
            </div>
          </div>
        </template>
      </div>
    </nav>

    <!-- User -->
    <div class="border-t border-slate-200 p-4">
      <div class="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700"
        >
          A
        </div>

        <div class="min-w-0">
          <p class="truncate text-sm font-medium text-slate-900">Admin</p>

          <p class="truncate text-xs text-slate-500">Administrator</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
