<template>
  <div
    class="chat__chart-full flex flex--column"
    :style="{ width: leftWidth + '%' }"
    v-if="!isMobile"
    v-show="chatsStore.currentChat.activeChart?.messageId"
    :class="{
      'chat__chart-full--open': leftWidth > 0,
      'chat__network-chart--open':
        chatsStore.currentChat.activeChart?.type == 'network_chart',
    }"
    ref="chatChartFull"
  >
    <ChartNetworkLegendContent
      v-show="chatsStore.currentChat.activeChart?.type == 'network_chart'"
      :colors="chatsStore.currentChat.activeChart?.legend?.colors"
      :sizes="chatsStore.currentChat.activeChart?.legend?.sizes"
      :edges="chatsStore.currentChat.activeChart?.legend?.edges"
    />
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
    <div class="chat__network-node-details card" v-if="networkNodeDetails">
      <div class="card__head">
        <p class="body-14 body--reg">Details Panel</p>
        <IconCopy class="icon icon--20 icon--white--600" />
      </div>
      <div class="card__body">
        <div
          v-for="(row, index) in networkNodeDetails"
          :key="index"
          class="card__row"
        >
          <span class="body-14 body--reg color--white-600">{{ row.name }}</span>
          <span class="body-14 body--reg">{{ row.value }}</span>
        </div>
      </div>
    </div>
    <div
      class="chart-full__content flex flex--column items--center"
      ref="svgElement"
    ></div>
    <div
      class="chart-full__minimap"
      v-show="
        chatsStore.currentChat.activeChart?.type == 'network_chart' &&
        !networkNodeDetails
      "
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
  <Teleport to="body">
    <ModalComponent
      :is_hide="!chatsStore.currentChat.activeChart?.messageId"
      @close-popup="() => closeChart()"
      v-if="isMobile"
      class="chat__chart-popup--full"
    >
      <template #head>
        {{ chatsStore.currentChat.activeChart?.name }}
      </template>

      <template #content>
        <div
          class="popup__chart-popup--full flex flex--column align--center justify--center"
          :class="{
            'popup__network-chart-popup':
              chatsStore.currentChat.activeChart?.type == 'network_chart',
          }"
          ref="chatChartFull"
        >
          <ChartNetworkLegendContent
            v-show="chatsStore.currentChat.activeChart?.type == 'network_chart'"
            :colors="chatsStore.currentChat.activeChart?.legend?.colors"
            :sizes="chatsStore.currentChat.activeChart?.legend?.sizes"
            :edges="chatsStore.currentChat.activeChart?.legend?.edges"
          />
          <div
            class="chat__network-node-details card"
            v-if="networkNodeDetails"
          >
            <div class="card__head">
              <p class="body-14 body--reg">Details Panel</p>
              <IconCopy class="icon icon--20 icon--white--600" />
            </div>
            <div class="card__body">
              <div
                v-for="(row, index) in networkNodeDetails"
                :key="index"
                class="card__row"
              >
                <span class="body-14 body--reg color--white-600">{{
                  row.name
                }}</span>
                <span class="body-14 body--reg">{{ row.value }}</span>
              </div>
            </div>
          </div>
          <div
            class="chart-full__content flex flex--column items--center"
            ref="svgElement"
          ></div>
          <div
            class="chart-full__minimap"
            v-show="
              chatsStore.currentChat.activeChart?.type == 'network_chart' &&
              !networkNodeDetails
            "
          >
            <div class="minimap__content">
              <div class="minimap__chart" ref="svgMinimapElement"></div>
              <div
                class="minimap__viewport"
                ref="svgMinimapViewportElement"
              ></div>
            </div>
          </div>
          <div
            class="chart-full__zoom flex"
            v-show="chatsStore.currentChat.activeChart?.type == 'network_chart'"
          >
            <IconButton
              :icon="IconMinus"
              type="secondary"
              @click="zoomOutFunction"
            />
            <IconButton
              :icon="IconPlus"
              type="secondary"
              @click="zoomInFunction"
            />
          </div>
        </div>
        <div class="popup__button">
          <BaseButton
            type="secondary"
            text="Download chart"
            :icon="IconDownload"
            size="m"
            iconPosition="right"
          />
        </div>
      </template>
    </ModalComponent>
  </Teleport>
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
    <div class="chat__messages" ref="chatMessagesEl">
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
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
  Teleport,
} from "vue";
import { useChatsStore } from "../../stores/chats";
import ChatMessage from "../chat/ChatMessage.vue";
import MessageInput from "../general/MessageInput.vue";
import {
  IconArrowsMinimize,
  IconDownload,
  IconPlus,
  IconMinus,
  IconCopy,
} from "@tabler/icons-vue";

import { Canvg } from "canvg";
import { useNetworkChart } from "../../composables/useNetworkChart";
import * as d3 from "d3";
import IconButton from "../general/IconButton.vue";
import BaseButton from "../general/BaseButton.vue";
import ChartNetworkLegendContent from "./ChartNetworkLegendContent.vue";
import ModalComponent from "../modals/ModalComponent.vue";

const { updateChart } = useNetworkChart();
const chatsStore = useChatsStore();

const svgElement = ref(null);
const svgMinimapElement = ref(null);
const svgMinimapViewportElement = ref(null);
const chatChartFull = ref(null);
const chatMessagesEl = ref(null);

const networkNodeDetails = ref(null);

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

        d3.select(svgElement.value)
          .selectAll("g.node")
          .on("click", (event) => {
            const group = event.target.closest("g.node");
            const nodeData = JSON.parse(group.dataset.info);

            networkNodeDetails.value = nodeData;
          });

        d3.select(svgElement.value).on("click", (e) => {
          if (
            !e.target.classList.contains("node") &&
            e.target.tagName != "circle"
          ) {
            networkNodeDetails.value = null;
          }
        });

        await nextTick();

        const containerWidth = document.querySelector(
          ".chatbot .chatbot__content"
        ).offsetWidth;
        const viewportWidth = (containerWidth * leftWidth.value) / 100;

        const { zoomIn, zoomOut } = updateChart(
          svgElement.value,
          chatChartFull.value,
          svgMinimapViewportElement.value,
          svgMinimapElement.value
        );

        zoomInFunction.value = zoomIn;
        zoomOutFunction.value = zoomOut;
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

watch(
  () => chatsStore.currentChat,
  async (newValue, oldValue) => {
    await nextTick();

    if (chatMessagesEl.value) {
      chatMessagesEl.value.scrollTop = chatMessagesEl.value.scrollHeight;
    }
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
  }
}

function stopResize() {
  window.removeEventListener("mousemove", onResize);
  window.removeEventListener("mouseup", stopResize);
}

onBeforeUnmount(() => {
  stopResize();
});

const isMobile = ref(false);

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  if (chatMessagesEl.value) {
    checkScreen();
    window.addEventListener("resize", checkScreen);

    chatMessagesEl.value.scrollTop = chatMessagesEl.value.scrollHeight;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
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
  z-index: 5;
}

@media screen and (min-width: 1921px) {
  .chat__content .chatbot__message-input {
    left: 12.5rem;
    right: 12.5rem;
  }
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

@media screen and (min-width: 1921px) {
  .chat__content .chat__messages .messages__inner {
    padding: 0px 12.5rem 13.75rem;
  }
}

@media screen and (max-width: 767px) {
  .chat__content .chat__messages .messages__inner {
    padding: 2rem 1rem;
  }

  .chat__content .chatbot__message-input {
    left: 0px;
    width: 100%;
  }
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

/* CHAT BUBLE NODE ELEMENTS */
.chat__network-node-details {
  width: 74%;
  position: absolute;

  bottom: 2.5rem;
  left: 2.5rem;
  z-index: 10;
}

/* BUBLE LEGEND */
.chat__chart-full .chat__network-chart-legend {
  position: absolute;
  top: 2.5rem;
  left: 2.5rem;
  width: auto;
  z-index: 10;
}

@media screen and (max-width: 767px) {
  .popup.chat__chart-popup--full .popup__body {
    height: 91.47%;
  }

  .popup.chat__chart-popup--full .popup__body .popup__content {
    height: 100%;
  }

  .popup.chat__chart-popup--full .popup__body .popup__chart-popup--full {
    height: 100%;
  }

  .popup.chat__chart-popup--full .chart-full__content,
  .popup.chat__chart-popup--full .chart-full__content .chart__content,
  .popup.chat__chart-popup--full .chart-full__content .chart__svg {
    width: 100%;
  }

  .popup.chat__chart-popup--full .chart-full__content {
    position: relative;
    height: 100%;
  }

  .popup.chat__chart-popup--full .chart-full__content svg {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }

  .popup.chat__chart-popup--full .chart-full__content .chart__legend {
    gap: 0.4375rem;
    margin-top: 0.3125rem;
  }

  .popup.chat__chart-popup--full
    .chart-full__content
    .chart__legend
    .chart__legend--item {
    gap: 0.25rem;
    font-size: 0.375rem;
  }

  .chat__content {
    flex: 0 0 auto;
  }

  /* POPUP */
  .popup__chart-popup--full {
    position: relative;
  }

  .chat__chart-popup--full:has(.popup__network-chart-popup)
    .popup__body
    .popup__content {
    padding: 0;
  }

  .popup__chart-popup--full .chart-full__zoom {
    position: absolute;
    top: 1rem;
    right: 1rem;
    gap: 0.5rem;
  }

  .popup__chart-popup--full .chart-full__minimap {
    position: absolute;
    bottom: 1rem;
    left: 1rem;

    height: 5rem;
    width: 140px;
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

  .popup__chart-popup--full .chart-full__minimap .minimap__content {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .popup__chart-popup--full
    .chart-full__minimap
    .minimap__content
    .minimap__viewport {
    position: absolute;
    top: 4px;
    bottom: 4px;
    width: 90px;
    border-radius: 8px;
    border: 1px solid var(--white-100, rgba(255, 255, 255, 0.1));
    background: var(--white-100, rgba(255, 255, 255, 0.1));
  }

  .popup__chart-popup--full
    .chart-full__minimap
    .minimap__content
    .minimap__chart {
    height: 100%;
  }

  .popup__chart-popup--full
    .chart-full__minimap
    .minimap__content
    .minimap__chart
    svg {
    width: 100%;
    height: auto;
  }

  /* CHAT BUBLE NODE ELEMENTS */
  .popup__chart-popup--full .chat__network-node-details {
    position: absolute;

    bottom: 0rem;
    left: 1rem;
    right: 1rem;
    width: auto;
    z-index: 10;
  }

  /* BUBLE LEGEND */
  .popup__chart-popup--full .chat__network-chart-legend {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
  }
  .popup__chart-popup--full
    .chat__network-chart-legend.chat__network-chart-legend--open {
    right: 1rem;
  }
  .chat__chart-popup--full .popup__button {
    padding: 0rem 1rem 2rem;
  }

  .chat__chart-popup--full .popup__button button {
    width: 100%;
  }
}
</style>
