<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar kiri -->
    <div class="w-54 bg-gray-100">
      <Sidebar />
    </div>

    <!-- Konten kanan -->
    <div class="flex-1 p-6 overflow-y-auto">
      <router-view />
    </div>
  </div>
</template>
