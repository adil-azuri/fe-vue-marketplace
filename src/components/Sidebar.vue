<script setup lang="ts">
import { ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

// ICONS
import {
  LogOut,
  Menu,
  X,
  Package,
  ShoppingCart,
  ShoppingBag,
  UserSquare,
} from "lucide-vue-next";

// Type untuk menu item
interface MenuItem {
  name: string;
  icon: any;
  href: string;
}

// Sidebar state
const showSidebar = ref<boolean>(false);

// Router
const route = useRoute();

// Dummy logout
const handleLogout = (): void => {
  console.log("Logout...");
};

// Menu items dengan type aman
const menuItems: MenuItem[] = [
  { name: "My Profile", icon: UserSquare, href: "/myprofile" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "My Cart", icon: ShoppingCart, href: "/mycart" },
  { name: "My Order", icon: ShoppingBag, href: "/myorders" },
];
</script>

<template>
  <div>
    <!-- MOBILE TOP BAR -->
    <div
      class="md:hidden fixed top-0 left-0 w-full bg-white shadow-sm p-3 z-50"
    >
      <button @click="showSidebar = true" class="text-gray-700">
        <Menu class="w-7 h-7" />
      </button>
    </div>

    <!-- OVERLAY (Mobile Only) -->
    <div
      v-if="showSidebar"
      @click="showSidebar = false"
      class="fixed inset-0 bg-opacity-40 z-40 md:hidden"
    ></div>

    <!-- SIDEBAR -->
    <aside
      :class="[
        'fixed top-0 left-0 w-60 h-full bg-white rounded-r-2xl border-r border-gray-100 flex flex-col justify-between shadow-xl transition-all duration-300 z-50',
        showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <!-- Close Button (Mobile) -->
      <div class="md:hidden flex justify-end p-3">
        <button @click="showSidebar = false" class="text-gray-600">
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- TOP SECTION -->
      <div class="flex-1 overflow-y-auto px-3 md:px-0">
        <!-- User Box -->
        <div class="p-3 pb-8">
          <div class="flex items-center space-x-3 mt-4">
            <div
              class="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <span class="text-orange-500 font-bold text-md">MH</span>
            </div>
            <span class="text-xl font-semibold text-gray-800">User</span>
          </div>
        </div>

        <!-- MENU LIST -->
        <div class="px-6 space-y-6">
          <h3 class="text-sm font-medium text-gray-500 mb-4 tracking-wider">
            Main Menu
          </h3>

          <nav class="space-y-2">
            <RouterLink
              v-for="item in menuItems"
              :key="item.name"
              :to="item.href"
              @click="showSidebar = false"
              :class="[
                'flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-colors duration-200',
                route.path === item.href
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-white text-gray-600 hover:bg-gray-50',
              ]"
            >
              <component :is="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </nav>
        </div>
      </div>

      <!-- LOGOUT BUTTON -->
      <div class="p-6 pt-4 border-t border-gray-100">
        <button
          @click="handleLogout"
          class="w-full bg-amber-600 hover:bg-amber-700 flex items-center space-x-3 p-3 text-base font-medium text-white rounded-lg shadow-md transition-colors duration-200"
        >
          <LogOut class="w-5 h-5 transform rotate-180" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  </div>
</template>
