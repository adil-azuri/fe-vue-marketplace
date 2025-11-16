<script setup>
import { ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

// ICONS (lucide-vue-next)
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  LayoutGrid,
  MessageSquare,
  Calendar,
  Bell,
  Package,
  Phone,
} from "lucide-vue-next";

// Emit ke parent agar router content bisa kasih margin kiri
const emit = defineEmits(["toggle"]);

// STATE MINIMIZE
const minimized = ref(false);
const route = useRoute();

// Toggle sidebar
const handleToggle = () => {
  minimized.value = !minimized.value;
  emit("toggle", minimized.value);
};

// Dummy logout
const handleLogout = () => {
  console.log("Logout...");
};

// Menu items
const menuItems = [
  { name: "Home", icon: LayoutGrid, href: "/" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "Walk In queue", icon: MessageSquare, href: "#" },
  { name: "Appointments", icon: Calendar, href: "#" },
  { name: "Notifications", icon: Bell, href: "#" },
  { name: "Services", icon: Phone, href: "#" },
];
</script>

<template>
  <div class="p-2">
    <div
      :class="[
        'fixed top-2 left-3 h-[calc(100vh-32px)] bg-white rounded-2xl shadow-lg border border-gray-100 z-40 flex flex-col justify-between transition-all duration-300',
        minimized ? 'w-16' : 'w-60',
      ]"
    >
      <!-- TOP SECTION -->
      <div class="flex-1 overflow-y-auto">
        <!-- Collapse Button + Logo -->
        <div class="p-3 pb-8">
          <!-- Collapse button -->
          <button
            @click="handleToggle"
            :class="[
              'bg-amber-600 hover:bg-amber-700 flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-colors duration-200 text-white shadow-md',
              minimized ? 'justify-center' : '',
            ]"
          >
            <ChevronRight v-if="minimized" class="w-4 h-4" />
            <ChevronLeft v-else class="w-4 h-4" />
            <span v-if="!minimized">Collapse</span>
          </button>

          <!-- Logo -->
          <div class="flex items-center space-x-3 mt-4">
            <div
              class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <span class="text-orange-500 font-bold text-md">MH</span>
            </div>

            <span v-if="!minimized" class="text-xl font-semibold text-gray-800">
              MarkHub
            </span>
          </div>
        </div>

        <!-- MENU LIST -->
        <div :class="[minimized ? 'px-2' : 'px-6', 'space-y-6']">
          <h3
            v-if="!minimized"
            class="text-sm font-medium text-gray-500 mb-4 tracking-wider"
          >
            Main Menu
          </h3>

          <nav class="space-y-2">
            <RouterLink
              v-for="item in menuItems"
              :key="item.name"
              :to="item.href"
              :class="[
                'flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-colors duration-200',
                route.path === item.href
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-white text-gray-600 hover:bg-gray-50',
              ]"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span v-if="!minimized">{{ item.name }}</span>
            </RouterLink>
          </nav>
        </div>
      </div>

      <!-- LOGOUT -->
      <div
        :class="[
          minimized ? 'p-2 pt-4' : 'p-6 pt-4',
          'border-t border-gray-100',
        ]"
      >
        <button
          @click="handleLogout"
          :class="[
            'w-full bg-amber-600 hover:bg-amber-700 flex items-center space-x-3 p-3 text-base font-medium text-white rounded-lg shadow-md transition-colors duration-200',
            minimized ? 'justify-center' : 'justify-start',
          ]"
        >
          <LogOut class="w-5 h-5 transform rotate-180" />
          <span v-if="!minimized">Log Out</span>
        </button>
      </div>
    </div>
  </div>
</template>
