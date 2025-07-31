<script setup lang="ts">
// Access environment variable from Vite
const fooVar = import.meta.env.VITE_FOO_VAR
</script>

<template>
  <div class="env-display p-4 border border-gray-300 rounded-lg bg-gray-50">
    <h3 class="text-lg font-semibold mb-2">Environment Variable Demo</h3>
    <div class="flex items-center gap-2">
      <span class="font-medium">FOO_VAR:</span>
      <span v-if="fooVar" class="px-2 py-1 bg-green-100 text-green-800 rounded">{{ fooVar }}</span>
      <span v-else class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Not set</span>
    </div>
    <p class="text-sm text-gray-600 mt-2">
      This value comes from the VITE_FOO_VAR environment variable passed from the server.
    </p>
  </div>
</template>

<style scoped>
/* All styles handled by Tailwind CSS classes */
</style>