<template>
  <main class="chatbot flex">
    <SideBar />
    <ChatBotContent />
  </main>
</template>

<script setup lang="ts">
import ChatBotContent from "./components/ChatBotContent.vue";
import SideBar from "./components/SideBar.vue";
import { useChatsStore } from "./stores/chats";

const chatsStore = useChatsStore();
chatsStore.loadFakeData();
</script>
