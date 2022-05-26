<script setup lang="ts">
const { index, color } = defineProps<{
  index: number;
  color: string;
}>();
</script>

<template>
  <div
    :key="index"
    style="
      width: 100%;
      height: 100%;
      background: green;
      border-radius: 50%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    {{ index }}
  </div>
</template>
