<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="leading-6 max-h-screen lg:flex lg:items-center lg:pr-20">
    <img alt="Vue logo" class="block mx-auto mb-8 lg:mr-8 lg:mb-0 lg:mx-0" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper lg:flex lg:items-start lg:flex-wrap">
      <HelloWorld msg="You did it!" />

      <nav class="w-full text-xs text-center mt-8 lg:text-left lg:-ml-4 lg:text-base lg:py-4 lg:mt-4">
        <RouterLink to="/" class="inline-block px-4 border-l border-[var(--color-border)] first:border-l-0 router-link-active:text-[var(--color-text)] hover:router-link-active:bg-transparent">Home</RouterLink>
        <RouterLink to="/about" class="inline-block px-4 border-l border-[var(--color-border)] first:border-l-0 router-link-active:text-[var(--color-text)] hover:router-link-active:bg-transparent">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Preserve router-link styling that can't be easily done with Tailwind */
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border-left: 0;
}
</style>
