<template>
  <main class="chatbot flex">
    <SideBar />
    <ChatBotContent />
  </main>
</template>

<script setup>
import { useChatsStore } from "../../stores/chats";

import ChatBotContent from "../ChatBotContent.vue";
import SideBar from "../SideBar.vue";

const chatsStore = useChatsStore();
chatsStore.loadFakeData();
</script>

<style scoped>
.chatbot {
  height: 100dvh;
  overflow: hidden;
}

@media screen and (max-width: 767px) {
  .chatbot {
    flex-direction: column;
    padding-top: 3.9375rem;
    padding-bottom: 5.5625rem;
  }
}
</style>
