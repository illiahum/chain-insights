<template>
  <div class="chatbot__content flex">
    <ChatContent v-if="chatsStore.currentChat?.id" />

    <StartContent v-else />
  </div>
</template>

<script setup>
import { useChatsStore } from "../stores/chats";
import ChatContent from "./content/ChatContent.vue";
import StartContent from "./content/StartContent.vue";
import MessageInput from "./general/MessageInput.vue";

const chatsStore = useChatsStore();
</script>

<style scoped>
.chatbot__content {
  position: relative;
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
}

.chatbot__content > div {
  width: 100%;
}

@media screen and (max-width: 767px) {
  .chatbot__content {
    height: 0px;
    overflow-y: scroll;
  }

  .chatbot__content > div {
    height: 100%;
  }
}
</style>
