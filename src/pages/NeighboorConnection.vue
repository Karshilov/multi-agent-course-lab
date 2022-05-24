<script lang="ts" setup>
import NeighboorConnection from '../components/NeighboorConnection.vue';
</script>

<template>
    <div style="position:fixed; top: 4rem; left: calc((100vw - 800px) / 2); right: calc((100vw - 800px) / 2);">
        <h2>最近邻耦合网络</h2>
        <component :is="NeighboorConnection"></component>
    </div>
</template>