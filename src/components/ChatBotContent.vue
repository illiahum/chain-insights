<template>
  <div class="chatbot__content">
    <ChatContent v-if="chatsStore.currentChat?.id" />

    <StartContent v-else />

    <MessageInput />
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
  flex: 1 1 auto;
  height: 100vh;
}
</style>
