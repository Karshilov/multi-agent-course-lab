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
      width: 30px;
      height: 30px;
      background: green;
      border-radius: 50%;
      margin: 10px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    {{ index }}
  </div>
</template>
