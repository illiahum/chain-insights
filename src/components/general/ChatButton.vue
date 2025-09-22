<template>
  <div :class="classes" @click="buttonClick">
    <span class="chat__currency body-12 body--reg">{{ currency }}</span>
    <span class="chat__name body-14 body--reg">{{ name }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatsStore } from "../../stores/chats";

const props = defineProps({
  id: String,
  name: String,
  currency: String,
});

const chatsStore = useChatsStore();

const buttonClick = () => {
  chatsStore.openChat(props.id);
};

const classes = computed(() => {
  let classes = "chat__button";

  if (props.id == chatsStore.currentChat?.id) {
    classes += " chat__button--active";
  }

  return classes;
});
</script>
