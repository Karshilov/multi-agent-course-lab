<script lang="ts" setup>
import SIRSModel from "../components/SIRSModel.vue";
</script>

<template>
  <div
    style="
      position: fixed;
      top: 4rem;
      left: calc((100vw - 800px) / 2);
      right: calc((100vw - 800px) / 2);
    "
  >
    <h2>SIRS传染病模型</h2>
    <component :is="SIRSModel"></component>
  </div>
</template>
