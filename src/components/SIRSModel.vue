<script lang="ts" setup>
import PersonNode from "./PersonNode.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { Starport } from "vue-starport";
let ps = ref(50);
let pr = ref(50);
let pi = ref(50);
let list = reactive([
  ...new Array(20).fill(0).map((_, i) => ({
    type: 0,
    id: i,
  })),
  ...new Array(10).fill(0).map((_, i) => ({
    type: 1,
    id: 20 + i,
  })),
]);

const listS = computed(() => {
  return list.filter((item) => item.type === 0);
});

const listI = computed(() => {
  return list.filter((item) => item.type === 1);
});

const listR = computed(() => {
  return list.filter((item) => item.type === 2);
});

let id: NodeJS.Timer | undefined = undefined;

const replay = () => {
  list.forEach((item, i) => {
    if (i < 20) item.type = 0;
    else item.type = 1;
  });
  if (id) clearInterval(id);
  id = setInterval(() => {
    list.forEach((person) => {
      if (person.type === 0 && Math.random() < ps.value / 100) {
        person.type = 1;
      } else if (person.type === 1 && Math.random() < pi.value / 100) {
        person.type = 2;
      } else if (person.type === 2 && Math.random() < pr.value / 100) {
        person.type = 0;
      }
    });
  }, 2000);
};

onMounted(() => {
  replay();
});
</script>

<template>
  <n-space vertical>
    <n-slider
      :min="0"
      :max="100"
      v-model:value="ps"
      v-on:update:value="replay()"
    />
    <n-slider
      :min="0"
      :max="100"
      v-model:value="pi"
      v-on:update:value="replay()"
    />
    <n-slider
      :min="0"
      :max="100"
      v-model:value="pr"
      v-on:update:value="replay()"
    />
  </n-space>
  <div style="display: flex; justify-content: space-around">
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 30%;
      "
    >
      <TransitionGroup name="proxy-list-a">
        <Starport
          v-for="person in listS"
          :port="String(person.id)"
          :key="person.id"
        >
          <PersonNode :index="person.id" color="red"></PersonNode>
        </Starport>
      </TransitionGroup>
    </div>
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 30%;
      "
    >
      <TransitionGroup name="proxy-list-b">
        <Starport
          v-for="person in listI"
          :port="String(person.id)"
          :key="person.id"
        >
          <PersonNode :index="person.id" color="yellow"></PersonNode>
        </Starport>
      </TransitionGroup>
    </div>
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 30%;
      "
    >
      <TransitionGroup name="proxy-list-c">
        <Starport
          v-for="person in listR"
          :port="String(person.id)"
          :key="person.id"
        >
          <PersonNode :index="person.id" color="green"></PersonNode>
        </Starport>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.proxy-list-a-enter-active,
.proxy-list-a-leave-active,
.proxy-list-b-enter-active,
.proxy-list-b-leave-active,
.proxy-list-c-enter-active,
.proxy-list-c-leave-active {
  transition: all 0.8s ease;
}
.proxy-list-a-enter-from,
.proxy-list-a-leave-to {
  margin-bottom: -7.5rem !important;
}
.proxy-list-b-enter-from,
.proxy-list-b-leave-to {
  margin-bottom: -10rem !important;
}
.proxy-list-c-enter-from,
.proxy-list-c-leave-to {
  margin-bottom: -12.5rem !important;
}
</style>
