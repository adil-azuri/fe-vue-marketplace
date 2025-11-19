<script setup lang="ts">
import { Search } from "lucide-vue-next";

const emit = defineEmits(["update:search"]);
</script>

<template>
  <div class="flex max-w-4xl w-full">
    <!-- SEARCH INPUT -->
    <div
      class="flex border-2 border-amber-500 w-full items-center space-x-3 rounded-2xl p-2"
    >
      <span class="text-amber-600 font-bold"><Search /></span>

      <input
        type="text"
        placeholder="Search Product"
        class="w-full rounded-2xl p-1 pl-2 border-2 border-amber-500 text-amber-700"
      />
    </div>
  </div>
</template>
