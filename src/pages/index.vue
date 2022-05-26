<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { NSpace } from "naive-ui";
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
    <n-space vertical>
      <h2>多智能体系统实验</h2>
      <RouterLink to="/fullconnection">全局耦合网络</RouterLink>
      <RouterLink to="/neighboorconnection">最近邻耦合网络</RouterLink>
      <RouterLink to="/randomconnection">随机耦合网络</RouterLink>
      <RouterLink to="/sirsmodel">SIRS传染病模型</RouterLink>
      <RouterLink to="/linearthreshold">线性阈值模型</RouterLink>
    </n-space>
  </div>
</template>
