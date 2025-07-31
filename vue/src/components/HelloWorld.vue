<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green font-medium text-[2.6rem] relative -top-2.5 text-center lg:text-left">{{ msg }}</h1>
    <h3 class="text-xl text-center lg:text-left">
      You've successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
/* No custom styles needed - all converted to Tailwind classes */
</style>