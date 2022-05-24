<script lang="ts" setup>
import FullConnection from '../components/FullConnection.vue';
</script>

<template>
    <div style="position:fixed; top: 4rem; left: calc((100vw - 800px) / 2); right: calc((100vw - 800px) / 2);">
        <h2>全局耦合网络</h2>
        <component :is="FullConnection"></component>
    </div>
</template>