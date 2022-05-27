<script lang="ts" setup>
import G6, { Graph } from "@antv/g6";
import { NButton, NSpace } from "naive-ui";
import { computed, onMounted, ref } from "vue";
const generateNodeData = (value: number, width: number, height: number) => {
  const degree = (2 * Math.PI) / value;
  const data = new Array(value).fill(0).map((_, i) => {
    const x = width / 2 + Math.cos(degree * i) * ((width / 2) * 0.75);
    const y = height / 2 + Math.sin(degree * i) * ((height / 2) * 0.75);
    return {
      x,
      y,
      id: `node${i}`,
      label: i === 0 ? (50 + Math.random() * 50).toFixed(0) : (Math.random() * 100).toFixed(0),
      style: {
        fill: i === 0 ? "#f8f2f8" : "#5dac81",
      },
    };
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
          label: (Math.random() * 100).toFixed(0),
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

const nextStep = () => {
  nodes.value = nodes.value.map((node) => {
    if (node.style.fill === "#f8f2f8") return node;
    const currentValue = edges.value
      .map((edge) => {
        if (edge.source === node.id) {
          const activatedNode = nodes.value.find((n) => n.id === edge.target);
          if (activatedNode?.style.fill === "#f8f2f8") {
            return parseInt(edge.label);
          } else {
            return 0;
          }
        } else if (edge.target === node.id) {
          const activatedNode = nodes.value.find((n) => n.id === edge.source);
          if (activatedNode?.style.fill === "#f8f2f8") {
            return parseInt(edge.label);
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      })
      .reduce((pre, acc) => pre + acc);
    if (currentValue >= parseInt(node.label)) {
      return {
        ...node,
        style: {
          fill: "#f8f2f8",
        },
      };
    } else {
      return node;
    }
  });
  if (graph) {
    graph.data({
      nodes: nodes.value,
      edges: edges.value
    });
    graph.render();
  }
};

onMounted(() => {
  graph = new G6.Graph({
    container: "linear-threshold",
    width: 800,
    height: 500,
    modes: {
      default: ["drag-node"],
    },
  });
  drawGraph(10, 40);
});
</script>

<template>
  <n-space vertical>
    <n-button v-on:click="nextStep()">Next Step</n-button>
    <div id="linear-threshold"></div>
  </n-space>
</template>
