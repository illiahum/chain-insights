<template>
  <template v-if="choosenOption">
    <div
      class="message__text flex flex--column"
      v-html="choosenOption.text"
    ></div>
    <div class="message__actions flex">
      <div class="flex"><IconChevronLeft /> 1 / 2 <IconChevronRight /></div>
      <div class="message__action">
        <IconReload />
      </div>
      <div class="message__action">
        <IconCopy />
      </div>
    </div>
  </template>
  <div class="message__options" v-else>
    <ChatMessageOption
      name="Option 1"
      :option="options[0]"
      @buttonClick="selectOption"
    />
    <ChatMessageOption
      name="Option 2"
      :option="options[1]"
      @buttonClick="selectOption"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useChatsStore } from "../../stores/chats";
import ChatMessageOption from "./ChatMessageOption.vue";
import {
  IconCopy,
  IconReload,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-vue";

const chatsStore = useChatsStore();
const props = defineProps({
  messageId: String,
  options: Array,
});

const activeOption = ref(null);

const choosenOption = computed(() => {
  let choosenOpt = null;

  props.options.forEach((opt) => {
    if (opt.is_choosen) choosenOpt = opt;
  });

  return choosenOpt;
});

const selectOption = (optionId) => {
  chatsStore.selectOption(props.messageId, optionId);
};
</script>
