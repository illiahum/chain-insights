<template>
  <div
    class="chat__chart-full flex flex--column"
    :style="{ width: leftWidth + '%' }"
    v-show="chatsStore.currentChat.activeChart?.messageId"
    :class="{
      'chat__chart-full--open': leftWidth > 0,
      'chat__network-chart--open':
        chatsStore.currentChat.activeChart?.type == 'network_chart',
    }"
    ref="chatChartFull"
  >
    <!-- <ChartNetworkLegendContent
      v-show="chatsStore.currentChat.activeChart?.type == 'network_chart'"
    /> -->
    <div class="chart-full__actions flex justify--end align--center">
      <div class="box__action chart-full__action" @click="downloadUrl">
        <IconDownload />
      </div>
      <div class="box__action chart-full__action" @click="closeChart">
        <IconArrowsMinimize />
      </div>
      <BaseButton
        v-show="leftWidth == 100"
        type="secondary"
        text="Show Chat"
        size="m"
        class="chat__hide-content"
        @click="() => (leftWidth = 40)"
      />
    </div>
    <div
      class="chart-full__content flex flex--column items--center"
      ref="svgElement"
    ></div>
    <div
      class="chart-full__minimap"
      v-show="chatsStore.currentChat.activeChart?.type == 'network_chart'"
    >
      <div class="minimap__content">
        <div class="minimap__chart" ref="svgMinimapElement"></div>
        <div class="minimap__viewport" ref="svgMinimapViewportElement"></div>
      </div>
    </div>
    <div
      class="chart-full__zoom flex"
      v-show="chatsStore.currentChat.activeChart?.type == 'network_chart'"
    >
      <IconButton :icon="IconMinus" type="secondary" @click="zoomOutFunction" />
      <IconButton :icon="IconPlus" type="secondary" @click="zoomInFunction" />
    </div>
    <div class="chat__splitter" @mousedown="startResize">
      <div class="splitter__drag"></div>
    </div>
  </div>
  <div
    class="chat__content"
    :style="{ width: 100 - leftWidth + '%' }"
    v-show="
      (leftWidth > 0 && leftWidth < 100) ||
      !chatsStore.currentChat.activeChart?.messageId
    "
  >
    <BaseButton
      v-show="leftWidth > 0"
      type="secondary"
      text="Hide Chat"
      size="m"
      class="chat__hide-content"
      @click="() => (leftWidth = 100)"
    />
    <div class="chat__messages">
      <div
        class="messages__inner flex flex--column align--start justify--end body-16 body--reg"
      >
        <ChatMessage
          v-for="msg in chatsStore.currentChat.messages"
          v-bind:key="msg.id"
          :msg="msg"
        />
      </div>
    </div>
    <MessageInput :hideLabels="leftWidth >= 50" />
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useChatsStore } from "../../stores/chats";
import ChatMessage from "../chat/ChatMessage.vue";
import MessageInput from "../general/MessageInput.vue";
import {
  IconArrowsMinimize,
  IconDownload,
  IconPlus,
  IconMinus,
} from "@tabler/icons-vue";
import { Canvg } from "canvg";
import { useNetworkChart } from "../../composables/useNetworkChart";
import * as d3 from "d3";
import IconButton from "../general/IconButton.vue";
import BaseButton from "../general/BaseButton.vue";
import ChartNetworkLegendContent from "./ChartNetworkLegendContent.vue";

const { updateChart } = useNetworkChart();
const chatsStore = useChatsStore();

const svgElement = ref(null);
const svgMinimapElement = ref(null);
const svgMinimapViewportElement = ref(null);
const chatChartFull = ref(null);

const leftWidth = ref(0);
let startX = 0;
let startWidth = 0;

const zoomInFunction = ref(null);
const zoomOutFunction = ref(null);

watch(
  () => chatsStore.currentChat.activeChart,
  async (newValue, oldValue) => {
    if (newValue?.messageId) {
      leftWidth.value = 40;

      svgElement.value.innerHTML = newValue.chart;

      if (chatsStore.currentChat.activeChart?.type == "network_chart") {
        svgMinimapElement.value.innerHTML = newValue.chart;
        d3.select(svgMinimapElement.value).select("g").attr("transform", "");

        await nextTick();

        const containerWidth = document.querySelector(
          ".chatbot .chatbot__content"
        ).offsetWidth;
        const viewportWidth = (containerWidth * leftWidth.value) / 100;
        changeViewportWidth(viewportWidth);

        const { zoomIn, zoomOut } = updateChart(
          svgElement.value,
          chatChartFull.value,
          svgMinimapViewportElement.value,
          svgMinimapElement.value
        );

        zoomInFunction.value = zoomIn;
        zoomOutFunction.value = zoomOut;
      } else if (chatsStore.currentChat.activeChart?.type == "chart") {
        //d3.select(svgElement.value).select("g").attr("transform", "scale(2)");
      }
    } else {
      leftWidth.value = 0;

      svgElement.value.innerHTML = "";
      svgMinimapElement.value.innerHTML = "";
    }
  },
  {
    deep: true,
  }
);

function startResize(e) {
  startX = e.clientX;
  startWidth = leftWidth.value;

  window.addEventListener("mousemove", onResize);
  window.addEventListener("mouseup", stopResize);
}

function onResize(e) {
  const dx = e.clientX - startX;
  const containerWidth = document.querySelector(
    ".chatbot .chatbot__content"
  ).offsetWidth;
  const viewportWidth = (startWidth / 100) * containerWidth + dx;
  const newWidth = (viewportWidth / containerWidth) * 100;

  if (newWidth > 30 && newWidth < 65) {
    leftWidth.value = newWidth;

    if (chatsStore.currentChat.activeChart?.type == "network_chart") {
      changeViewportWidth(viewportWidth);
    }
  }
}

function changeViewportWidth(width) {
  const svgWidth = svgElement.value.querySelector("svg").clientWidth;

  svgMinimapViewportElement.value.style.width = `${(width * 220) / svgWidth}px`;
}

function stopResize() {
  window.removeEventListener("mousemove", onResize);
  window.removeEventListener("mouseup", stopResize);
}

onBeforeUnmount(() => {
  stopResize();
});

function closeChart() {
  chatsStore.closeChart();
}

const downloadUrl = function () {
  if (!chatsStore.currentChat.activeChart?.chart) return "";

  const chart = document.createElement("div");
  chart.innerHTML = chatsStore.currentChat.activeChart.chart;

  const svgElement = chart.querySelector("svg");
  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  const width =
    svgElement.viewBox.baseVal.width ||
    svgElement.getBoundingClientRect().width;
  const height =
    svgElement.viewBox.baseVal.height ||
    svgElement.getBoundingClientRect().height;

  canvas.width = width;
  canvas.height = height;

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
</script>

<style>
.chat__content {
  position: relative;
  width: 100%;
  height: 100%;
}

.chat__content .chat__hide-content {
  position: absolute;
  top: 2.5rem;
  left: 3rem;
}

.chat__content .chatbot__message-input {
  left: 9.375rem;
  right: 9.375rem;
}

.chat__content .chat__messages {
  height: 100%;
  overflow-y: auto;
}

.chat__content .chat__messages .messages__inner {
  width: 100%;
  padding: 0px 9.375rem 13.75rem;
  gap: 1.5rem;
}

.chat__chart-full {
  position: relative;
}

.chat__chart-full .chart-full__zoom {
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  gap: 0.5rem;
}

.chat__chart-full .chart-full__minimap {
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;

  height: auto;
  width: 220px;
  border-radius: 0.5rem;
  border: 0.341px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: linear-gradient(
      172deg,
      rgba(71, 120, 234, 0) -30.31%,
      rgba(71, 120, 234, 0.04) 124.3%
    ),
    rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(1.34375rem);
}

.chat__chart-full .chart-full__minimap .minimap__content {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.chat__chart-full .chart-full__minimap .minimap__content .minimap__viewport {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 90px;
  border-radius: 8px;
  border: 1px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: var(--white-100, rgba(255, 255, 255, 0.1));
}

.chat__chart-full .chart-full__minimap .minimap__content .minimap__chart {
  height: 100%;
}

.chat__chart-full .chart-full__minimap .minimap__content .minimap__chart svg {
  width: 100%;
  height: auto;
}

.chat__chart-full.chat__chart-full--open
  + .chat__content
  .chat__messages
  .messages__inner {
  padding: 0px 3rem 13.75rem;
}

.chat__chart-full.chat__chart-full--open
  + .chat__content
  .chatbot__message-input {
  left: 3rem;
  right: 3rem;
}

.chat__chart-full .chart-full__actions {
  flex: 0 0 auto;
  gap: 1rem;
  padding: 0px 2.5rem;
}

.chat__chart-full .chart-full__actions .chart-full__action {
  cursor: pointer;
}

.chat__chart-full .chart-full__actions .chat__hide-content {
  margin-left: 1.5rem;
}

.chat__chart-full .chart-full__actions svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--white-600);
}
</style>
