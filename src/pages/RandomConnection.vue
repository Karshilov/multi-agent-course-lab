<script lang="ts" setup>
import RandomConnection from '../components/RandomConnection.vue';
</script>

<template>
    <div style="position:fixed; top: 4rem; left: calc((100vw - 800px) / 2); right: calc((100vw - 800px) / 2);">
        <h2>随机耦合网络</h2>
        <component :is="RandomConnection"></component>
    </div>
</template>