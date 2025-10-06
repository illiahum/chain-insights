<template>
  <main class="chatbot flex">
    <SideBar />
    <ChatBotContent />
  </main>
</template>

<script setup>
import ChatBotContent from "../ChatBotContent.vue";
import SideBar from "../SideBar.vue";
</script>

<style scoped>
.chatbot {
  height: 100dvh;
  overflow: hidden;
}
</style>
