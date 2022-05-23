<script lang="ts" setup>
import G6 from "@antv/g6";
import { ref } from "vue";
const nodeCount = ref(0);

const generateNodeData = (value: number, width: number, height: number) => {
  const degree = (2 * Math.PI) / value;
  const data = new Array(value).fill(0).map((_, i) => {
    const x = width / 2 + Math.cos(degree * i) * ((width / 2) * 0.75);
    const y = height / 2 + Math.sin(degree * i) * ((height / 2) * 0.75);
    return { x, y, id: `node${i}` };
  });
  return data;
};

const generateEdgeData = (value: number) => {
  const edges = [];
  for (let i = 0; i < value; i++) {
    for (let j = i + 1; j < value; j++) {
      edges.push({
        source: `node${i}`,
        target: `node${j}`,
        type: "quadratic",
      });
    }
  }
  return edges;
};

const drawGraph = (value: number) => {
  const graph = new G6.Graph({
    container: "full-connection",
    width: 800,
    height: 500,
  });
  const data = {
    nodes: generateNodeData(value, graph.getWidth(), graph.getHeight()),
    edges: generateEdgeData(value),
  };
  graph.data(data);
  graph.render();
};
</script>

<template>
  
  <div id="full-connection"></div>
</template>



