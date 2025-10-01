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
  overflow: hidden;
}
</style>
