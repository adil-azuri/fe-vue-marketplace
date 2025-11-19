<script setup>
import Sidebar from "./components/Sidebar.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const minimized = ref(false);

const showSidebar = computed(
  () =>
    route.path !== "/login" && route.path !== "/register" && route.path !== "/"
);
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar v-if="showSidebar" @toggle="minimized = $event" />

    <!-- Content -->
    <div
      :class="[
        'flex-1 overflow-y-auto transition-all duration-300',
        showSidebar ? (minimized ? 'md:ml-16 ml-0' : 'md:ml-60 ml-0') : 'ml-0',
      ]"
    >
      <router-view />
    </div>
  </div>
</template>
