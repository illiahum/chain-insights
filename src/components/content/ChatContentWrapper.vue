<template>
  <div class="chat__content-scroll wrapper flex flex--column">
    <div :class="computedClass" ref="chatMessagesEl">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { useChatsStore } from "../../stores/chats";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});

const computedClass = computed(() => {
  return `chat__content-wrapper ${props.class}`;
});

const chatMessagesEl = ref(null);
const chatsStore = useChatsStore();

watch(
  () => chatsStore.currentChat,
  async (newValue, oldValue) => {
    await nextTick();

    if (chatMessagesEl.value) {
      chatMessagesEl.value.scrollTop = chatMessagesEl.value.scrollHeight;
    }
  }
);
</script>
