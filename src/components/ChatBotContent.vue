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
