<template>
  <div :class="classes">
    <ChatTable
      v-if="msg?.type == 'table'"
      :name="msg?.table?.name"
      :head="msg?.table?.head"
      :rows="msg?.table?.row"
    />

    <ChatMessageOptions
      v-if="msg?.type == 'options'"
      :options="msg?.options"
      :messageId="msg?.id"
    />

    <ChatChart
      v-if="msg?.type == 'chart'"
      :legend="['Address 1', 'Address 2']"
      name="Alpha Token Accumulation for Subnet 15 Participants"
      :messageId="msg?.id"
    />

    <ChatNetworkChart
      v-if="msg?.type == 'network_graph'"
      :legend="['Address 1', 'Address 2']"
      name="Connections between the validator and other addresses"
      :nodes="msg?.nodes"
      :messageId="msg?.id"
    />

    <div
      class="message__text flex flex--column"
      v-if="msg?.text != ''"
      v-html="msg?.text"
    ></div>
    <div
      v-if="msg?.author == 'bot' && msg?.type != 'options'"
      class="message__actions flex"
    >
      <div class="message__action">
        <IconReload />
      </div>
      <div class="message__action">
        <IconCopy />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatsStore } from "../../stores/chats";
import { IconCopy, IconReload } from "@tabler/icons-vue";
import ChatTable from "./ChatTable.vue";
import ChatMessageOptions from "./ChatMessageOptions.vue";
import ChatChart from "./ChatChart.vue";
import ChatNetworkChart from "./ChatNetworkChart.vue";

const chatsStore = useChatsStore();
const props = defineProps({
  id: String,
  msg: Object,
});

const classes = computed(() => {
  let classes = `${props.class} chat__message chat__message--${props.msg?.type} chat__message--${props.msg?.author} flex flex--column`;

  return classes;
});
</script>
