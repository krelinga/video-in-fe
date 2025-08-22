<script setup lang="ts">
// Declare envVars on the Window interface to avoid TS2339 error
// TODO: where's a better place to put this so that it will be shared globally?
declare global {
  interface Window {
    envVars?: Record<string, string>;
  }
}
// Access environment variable from runtime config
const fooVar = window.envVars?.FOO_VAR
</script>

<template>
  <div class="env-display p-4 border border-gray-300 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Environment Variable Demo</h3>
    <div class="flex items-center gap-2">
      <span class="font-medium">FOO_VAR:</span>
      <span v-if="fooVar" class="px-2 py-1 bg-green-100 text-green-800 rounded">{{ fooVar }}</span>
      <span v-else class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Not set</span>
    </div>
    <p class="text-sm text-gray-600 mt-2">
      This value comes from the FOO_VAR environment variable passed at runtime.
    </p>
  </div>
</template>

<style scoped>
/* All styles handled by Tailwind CSS classes */
</style>