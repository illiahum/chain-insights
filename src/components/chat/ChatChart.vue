<template>
  <ChatMessageBox
    type="chart"
    :class="{
      chart__hide: fullChart,
    }"
  >
    <template #head>
      <IconChartLine v-show="fullChart" />
      <span>{{ name }}</span>
    </template>
    <template #actions>
      <div
        class="box__action message__action"
        @click="closeChart"
        v-if="fullChart"
      >
        <IconArrowsMinimize />
      </div>
      <div class="box__action message__action" @click="openChart" v-else>
        <IconArrowsMaximize />
      </div>
      <div
        class="box__action message__action"
        @click="downloadUrl"
        v-if="!fullChart"
      >
        <IconDownload />
      </div>
    </template>

    <template #content>
      <div class="chart__content" ref="chartBoxEl">
        <div class="chart__svg" ref="chart"></div>
        <div class="chart__legend flex justify--end align--center">
          <div
            class="chart__legend--item flex align--center body-12 body-reg"
            v-for="(item, index) in legend"
            :key="index"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="6"
              viewBox="0 0 15 6"
            >
              <rect
                x="5"
                y="0.5"
                width="5"
                height="5"
                rx="2.5"
                :fill="colors[index]"
              />
              <rect y="2.5" width="15" height="1" :fill="colors[index]" />
            </svg>

            {{ item }}
          </div>
        </div>
      </div>
    </template>
  </ChatMessageBox>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useChatsStore } from "../../stores/chats";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChartLine,
  IconDownload,
} from "@tabler/icons-vue";
import ChatMessageBox from "./ChatMessageBox.vue";
import * as d3 from "d3";
import { Canvg } from "canvg";

const chatsStore = useChatsStore();
const props = defineProps({
  messageId: String,
  name: String,
  legend: Array,
  data: Array,
});

const colors = ref([
  "#F2DDA6",
  "#F2A6A6",
  "#C1F2A6",
  "#A6F2EA",
  "#A6B3F2",
  "#DEA6F2",
]);
const chart = ref(null);
const chartBoxEl = ref(null);
const fullChart = ref(false);

watch(
  () => chatsStore.currentChat.activeChart,
  (newValue, oldValue) => {
    if (newValue?.messageId && newValue?.chart) {
      fullChart.value = true;
    } else {
      fullChart.value = false;
    }
  },
  {
    deep: true,
  }
);

const createChart = function () {
  const data = props.data;

  const allValues = data.flat();

  const width = 696,
    height = 416;

  const margin = { top: 0, right: 30, bottom: 80, left: 60 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3
    .select(chart.value)
    .append("svg")
    .attr("class", "chart")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scalePoint()
    .domain(allValues.map((d) => d.name))
    .range([0, innerWidth])
    .padding(0.5);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(allValues, (d) => d.value)])
    .nice()
    .range([innerHeight, 0]);

  data.forEach((dataset, i) => {
    const line = d3
      .line()
      .x((d) => x(d.name))
      .y((d) => y(d.value));

    g.append("path")
      .datum(dataset)
      .attr("fill", "none")
      .attr("stroke", colors.value[i])
      .attr("stroke-width", 1)
      .attr("d", line);

    g.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.name))
      .attr("cy", (d) => y(d.value))
      .attr("r", 1.5)
      .attr("fill", colors.value[i]);
  });

  g.append("g")
    .attr("class", "chart__x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickSize(0).tickPadding(28))
    .call((g) => {
      g.selectAll(".tick text")
        .attr("class", "body-12 body-reg")
        .attr("transform", "rotate(-30)");

      g.selectAll(".tick line")
        .clone()
        .attr("stroke-opacity", 0.1)
        .attr("y1", -innerHeight);
    });

  // X-axis label
  svg
    .append("text")
    .attr("class", "chart__x-label chart__axis-label body-12 body-reg")
    .attr("x", width / 2)
    .attr("y", height)
    .style("text-anchor", "middle")
    .text("Date");

  g.append("g")
    .attr("class", "chart__y-axis")
    .call(d3.axisLeft(y).tickSize(0).tickPadding(10))
    .call((g) => {
      g.selectAll(".tick text").attr("class", "body-12 body-reg");

      g.selectAll(".tick line")
        .clone()
        .attr("stroke-opacity", 0.1)
        .attr("x2", innerWidth);
    });

  svg
    .append("text")
    .attr("class", "chart__y-label chart__axis-label body-12 body-reg")
    .attr("x", -innerHeight / 2)
    .attr("y", 20)
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
    .text("Accumulated Alpha Tokens");
};

const downloadUrl = function () {
  if (!chart.value) return "";

  const svgElement = chart.value.querySelector("svg");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = svgElement.width.baseVal.value;
  canvas.height = svgElement.height.baseVal.value;

  Canvg.from(ctx, new XMLSerializer().serializeToString(svgElement)).then(
    (v) => {
      v.render();

      const imgData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imgData;
      a.download = "chart.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  );
};

const openChart = function () {
  chatsStore.openChart(
    props.messageId,
    chartBoxEl.value.outerHTML,
    "chart",
    null,
    props.name
  );
};

const closeChart = function () {
  chatsStore.closeChart();
};

onMounted(() => {
  createChart();
});
</script>
