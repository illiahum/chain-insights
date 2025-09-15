<template>
  <div
    class="chat__chart-full flex flex--column"
    :style="{ width: leftWidth + '%' }"
    v-if="
      chatsStore.currentChat.activeChart?.messageId &&
      chatsStore.currentChat.activeChart?.chart
    "
  >
    <div class="chart-full__actions flex justify--end">
      <div class="box__action chart-full__action" @click="downloadUrl">
        <IconDownload />
      </div>
      <div class="box__action chart-full__action" @click="closeChart">
        <IconArrowsMinimize />
      </div>
    </div>
    <div
      v-html="chatsStore.currentChat.activeChart.chart"
      class="chart-full__content flex flex--column items--center"
    ></div>
    <div class="chat__splitter" @mousedown="startResize">
      <div class="splitter__drag"></div>
    </div>
  </div>
  <div class="chat__content" :style="{ width: 100 - leftWidth + '%' }">
    <div class="chat__messages">
      <div
        class="messages__inner flex flex--column align--start justify--end body-16 body--reg"
      >
        <ChatMessage
          v-for="msg in chatsStore.currentChat.messages"
          v-bind:key="msg.id"
          :id="msg.id"
          :text="msg.text"
          :type="msg.type"
          :author="msg.author"
          :table="msg?.table"
          :options="msg?.options"
        />
      </div>
    </div>
    <MessageInput />
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { useChatsStore } from "../../stores/chats";
import ChatMessage from "../chat/ChatMessage.vue";
import MessageInput from "../general/MessageInput.vue";
import { IconArrowsMinimize, IconDownload } from "@tabler/icons-vue";
import { Canvg } from "canvg";

const chatsStore = useChatsStore();

const leftWidth = ref(0);
let startX = 0;
let startWidth = 0;

watch(
  () => chatsStore.currentChat.activeChart,
  (newValue, oldValue) => {
    if (newValue?.messageId && newValue?.chart) {
      leftWidth.value = 40;
    } else {
      leftWidth.value = 0;
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
  const containerWidth = document.querySelector(".chatbot").offsetWidth;
  const newWidth =
    (((startWidth / 100) * containerWidth + dx) / containerWidth) * 100;

  if (newWidth > 30 && newWidth < 80) {
    leftWidth.value = newWidth;
  }
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

<style scoped>
.chat__content {
  position: relative;
  width: 100%;
  height: 100%;
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

.chat__chart-full + .chat__content .chat__messages .messages__inner {
  padding: 0px 3rem 13.75rem;
}

.chat__chart-full + .chat__content .chatbot__message-input {
  left: 3rem;
  right: 3rem;
}

.chat__chart-full .chart-full__actions {
  flex: 0 0 auto;
  gap: 1rem;
}

.chat__chart-full .chart-full__actions .chart-full__action {
  cursor: pointer;
}

.chat__chart-full .chart-full__actions svg {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--white-600);
}
</style>
