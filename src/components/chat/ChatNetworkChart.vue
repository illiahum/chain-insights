<template>
  <ChatMessageBox
    :name="name"
    type="network__chart"
    :class="{
      chart__hide: fullChart,
    }"
  >
    <template #box-actions>
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
      <div class="chart__content">
        <svg ref="chart">
          <defs>
            <!-- GOLD -->
            <radialGradient
              id="buble_radial"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="translate(67.19% 74.61%) rotate(-60)"
            >
              <stop offset="0%" stop-color="white" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>

            <linearGradient id="buble_linear" gradientTransform="rotate(90)">
              <stop stop-color="#F2DDA6" stop-opacity="0" />
              <stop offset="1" stop-color="#F2DDA6" stop-opacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
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
  IconDownload,
} from "@tabler/icons-vue";
import ChatMessageBox from "./ChatMessageBox.vue";
import { Canvg } from "canvg";
import { useNetworkChart } from "./../../composables/useNetworkChart";

const chatsStore = useChatsStore();
const props = defineProps({
  messageId: String,
  name: String,
  nodes: Array,
  legend: Array,
});

const chart = ref(null);
const fullChart = ref(false);

watch(
  () => chatsStore.currentChat.activeChart,
  (newValue, oldValue) => {
    if (newValue?.messageId) {
      fullChart.value = true;
    } else {
      fullChart.value = false;
    }
  },
  {
    deep: true,
  }
);

const { createChart } = useNetworkChart();

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
  chatsStore.openChart(props.messageId, chart.value.outerHTML);
};

const closeChart = function () {
  chatsStore.closeChart();
};

onMounted(() => {
  createChart(props.nodes, chart.value);
});
</script>
