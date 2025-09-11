<template>
  <div class="chat__content">
    <div
      class="chat__content-inner flex flex--column align--start justify--end body-16 body--reg"
    >
      <ChatMessage
        v-for="msg in chatsStore.currentChat.messages"
        v-bind:key="msg.id"
        :text="msg.text"
        :type="msg.type"
        :author="msg.author"
        :table="msg?.table"
      />
    </div>
  </div>
</template>

<script setup>
import { useChatsStore } from "../../stores/chats";
import ChatMessage from "../chat/ChatMessage.vue";

const chatsStore = useChatsStore();
</script>

<style scoped>
.chat__content {
  padding-bottom: 0px;
  height: 100%;
  padding-bottom: 13.75rem;
  overflow-y: auto;
}

.chat__content .chat__content-inner {
  padding: 0px 9.375rem 0px;
  gap: 1.5rem;
}
</style>
