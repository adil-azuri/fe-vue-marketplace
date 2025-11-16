<script setup>
import Sidebar from "./components/Sidebar.vue";
import { ref } from "vue";

const minimized = ref(false);
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar @toggle="minimized = $event" />

    <!-- Content -->
    <div
      :class="[
        'flex-1 p-6 overflow-y-auto transition-all duration-300',
        minimized ? 'ml-16' : 'ml-60',
      ]"
    >
      <router-view />
    </div>
  </div>
</template>
