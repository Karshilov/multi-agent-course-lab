<script lang="ts" setup>
import G6, { Graph } from "@antv/g6";
import { NSlider, NSpace } from "naive-ui";
import { computed, onMounted, ref } from "vue";
const nodeCount = ref(5);
const prob = ref(2);

const generateNodeData = (value: number, width: number, height: number) => {
  const degree = (2 * Math.PI) / value;
  const data = new Array(value).fill(0).map((_, i) => {
    const x = width / 2 + Math.cos(degree * i) * ((width / 2) * 0.75);
    const y = height / 2 + Math.sin(degree * i) * ((height / 2) * 0.75);
    return { x, y, id: `node${i}` };
  });
  return data;
};

const generateEdgeData = (value: number, probability: number) => {
  const edges = [];
  for (let i = 0; i < value; i++) {
    for (let j = i + 1; j < value; j++) {
      if (Math.random() * 100 < probability) {
          edges.push({
          source: `node${i}`,
          target: `node${j}`,
          type: "quadratic",
        });
      }
    }
  }
  return edges;
};

const nodes = ref(generateNodeData(5, 800, 500));
const edges = ref(generateEdgeData(5, 2));

let graph: Graph | undefined = undefined;

const drawGraph = (value: number, probability: number) => {
  if (graph) {
    nodes.value = generateNodeData(value, graph.getWidth(), graph.getHeight());
    edges.value = generateEdgeData(value, probability);
    const data = {
      nodes: nodes.value,
      edges: edges.value,
    };
    graph.data(data);
    graph.render();
  }
};

onMounted(() => {
  graph = new G6.Graph({
    container: "random-connection",
    width: 800,
    height: 500,
    modes: {
      default: ['drag-node'],
    },
  });
  drawGraph(5, 2);
})

const averageLength = computed(() => {
  const n = nodeCount.value;
  const f = new Array(n).fill(0).map(_ => new Array(n).fill(0x3f3f3f3f));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (edges.value.find(item => item.source === `node${i}` && item.target === `node${j}`)) {
        f[i][j] = f[j][i] = 1;
      }
    }
  }
  let tot = 0, cnt = 0;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (k !== i && i !== j && k !== j) {
          f[i][j] = Math.min(f[i][j], f[i][k] + f[k][j]);
        }
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      tot += f[i][j];
      cnt++;
    }
  }
  return tot / cnt;
})

const clusterCoefficient = computed(() => {
  const n = nodeCount.value;
  let closureTriangles = 0;
  let triples = 0;
  for (let k = 0; k < n; k++) {
    for (let i = k + 1; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const ki = edges.value.find((item) => item.source === `node${k}` && item.target === `node${i}`)
        const ij = edges.value.find((item) => item.source === `node${i}` && item.target === `node${j}`)
        const kj = edges.value.find((item) => item.source === `node${k}` && item.target === `node${j}`)
        if (ki && ij && kj) {
          closureTriangles ++;
          triples += 3;
        }
        else if ((ki && ij) || (ki && kj) || (ij && kj)) {
          triples ++;
        }
      }
    }
  }
  return 3 * closureTriangles / triples;
})

</script>

<template>
  <n-space vertical>
    <n-slider :min="1" :max="100" v-model:value="prob"
      v-on:update:value="drawGraph(nodeCount, prob)">
    </n-slider>
    <n-slider :min="2" :max="15" v-model:value="nodeCount" v-on:update:value="drawGraph(nodeCount, prob)">
    </n-slider>
    <div id="random-connection"></div>
    <div>L<sub>GC</sub>={{ averageLength }}</div>
    <div>C<sub>GC</sub>={{ clusterCoefficient }}</div>
  </n-space>
</template>