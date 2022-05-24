<script setup lang="ts">
import { StarportCarrier } from "vue-starport";
import { RouterView } from "vue-router";
</script>

<template>
  <StarportCarrier>
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </StarportCarrier>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
