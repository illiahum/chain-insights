<template>
  <div :class="classes">
    <ChatTable
      v-if="type == 'table'"
      :name="table?.name"
      :head="table?.head"
      :rows="table?.row"
    />

    <ChatMessageOptions
      v-if="type == 'options'"
      :options="options"
      :messageId="id"
    />

    <ChatChart
      v-if="type == 'chart'"
      :legend="['Address 1', 'Address 2']"
      name="Alpha Token Accumulation for Subnet 15 Participants"
      :messageId="id"
    />

    <div
      class="message__text flex flex--column"
      v-if="text != ''"
      v-html="text"
    ></div>
    <div
      v-if="author == 'bot' && type != 'options'"
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

const chatsStore = useChatsStore();
const props = defineProps({
  id: String,
  text: String,
  author: {
    type: String,
    default: "user",
  },
  type: {
    type: String,
    default: "text",
  },
  table: {
    type: Object,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  class: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  let classes = `${props.class} chat__message chat__message--${props.type} chat__message--${props.author} flex flex--column`;

  return classes;
});
</script>
