<template>
  <div class="sidebar__chats flex flex--column">
    <div class="chats__group">
      <p class="group__title body-14 body--semi">Today</p>
      <div class="group__list">
        <ChatButton
          v-for="chat in chatsStore.todayChats"
          :name="chat.name"
          :currency="chat.currency"
          :id="chat.id"
          :key="chat.id"
          @click="$emit('click')"
        />
      </div>
    </div>

    <div class="chats__group">
      <p class="group__title body-14 body--semi">Last 7 Days</p>
      <div class="group__list">
        <ChatButton
          v-for="chat in chatsStore.lastWeekChats"
          :name="chat.name"
          :currency="chat.currency"
          :id="chat.id"
          :key="chat.id"
          @click="$emit('click')"
        />
      </div>
    </div>

    <div class="chats__group">
      <p class="group__title body-14 body--semi">Last month</p>
      <div class="group__list">
        <ChatButton
          v-for="chat in chatsStore.lastMonthChats"
          :name="chat.name"
          :currency="chat.currency"
          :id="chat.id"
          :key="chat.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatsStore } from "../../stores/chats";
import ChatButton from "../general/ChatButton.vue";

const chatsStore = useChatsStore();
</script>

<style scoped>
.sidebar__chats {
  flex: 1 1 auto;
  overflow-y: auto;
  height: 0px;
}
</style>
