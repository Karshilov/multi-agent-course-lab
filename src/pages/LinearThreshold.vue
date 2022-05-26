<script lang="ts" setup>
import LinearThreshold from '../components/LinearThreshold.vue';
</script>

<template>
    <div style="position:fixed; top: 4rem; left: calc((100vw - 800px) / 2); right: calc((100vw - 800px) / 2);">
        <h2>线性阈值模型</h2>
        <component :is="LinearThreshold"></component>
    </div>
</template>