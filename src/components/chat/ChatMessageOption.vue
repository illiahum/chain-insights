<template>
  <ChatMessageBox :name="name" type="option">
    <template #box-actions>
      <div class="box__action message__action">
        <IconCopy />
      </div>
    </template>

    <template #content>
      <div v-html="option?.text"></div>
      <BaseButton
        :icon="IconArrowNarrowRight"
        text="Select this answer"
        :full-width="true"
        iconPosition="right"
        type="secondary"
        @click="$emit('buttonClick', option.id)"
      />
    </template>
  </ChatMessageBox>
</template>

<script setup>
import { computed } from "vue";
import { useChatsStore } from "../../stores/chats";
import { IconCopy, IconArrowNarrowRight } from "@tabler/icons-vue";
import ChatMessageBox from "./ChatMessageBox.vue";
import BaseButton from "../general/BaseButton.vue";

const chatsStore = useChatsStore();
const props = defineProps({
  name: String,
  option: Object,
});
const emits = defineEmits(["buttonClick"]);
</script>
