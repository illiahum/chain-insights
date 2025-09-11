<template>
  <div :class="classes">
    <ChatTable
      v-if="type == 'table'"
      :name="table?.name"
      :head="table?.head"
      :rows="table?.row"
    />
    <div class="message__text flex flex--column" v-html="text"></div>
    <div v-if="author == 'bot'" class="message__actions flex">
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

const chatsStore = useChatsStore();
const props = defineProps({
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
    default: "text",
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
