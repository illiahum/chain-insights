<template>
  <template v-if="choosenOption">
    <div
      class="message__text flex flex--column"
      v-html="options[activeOption].text"
    ></div>
    <div class="message__actions flex">
      <div
        class="message__action flex align--center gap--4 body-14 body--reg color--white-600"
      >
        <IconChevronLeft class="icon icon--16" @click="choosePrevOption" />
        {{ activeNumberOption }} / 2
        <IconChevronRight class="icon icon--16" @click="chooseNextOption" />
      </div>
      <div class="message__action">
        <IconReload class="icon icon--16" />
      </div>
      <div class="message__action">
        <IconCopy
          class="icon icon--16"
          @click="() => copyContent(options[activeOption].text)"
        />
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
import { computed, onBeforeMount, ref, watch } from "vue";
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
const activeNumberOption = ref(1);

const choosePrevOption = () => {
  if (activeNumberOption.value > 1) {
    if (activeOption.value == 0) {
      activeOption.value += 1;
      activeNumberOption.value -= 1;
    } else if (activeOption.value == 1) {
      activeOption.value -= 1;
      activeNumberOption.value -= 1;
    }
  }
};

const chooseNextOption = () => {
  if (activeNumberOption.value == 1) {
    if (activeOption.value == 0) {
      activeOption.value += 1;
      activeNumberOption.value += 1;
    } else if (activeOption.value == 1) {
      activeOption.value -= 1;
      activeNumberOption.value += 1;
    }
  }
};

const choosenOption = computed(() => {
  let choosenOpt = null;

  props.options.forEach((opt, index) => {
    if (opt.is_choosen) choosenOpt = opt;
  });

  return choosenOpt;
});

watch(
  props.options,
  () => {
    props.options.forEach((opt, index) => {
      if (opt.is_choosen) activeOption.value = index;
    });
  },
  { deep: true }
);

const selectOption = (optionId) => {
  chatsStore.selectOption(props.messageId, optionId);
};

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

onBeforeMount(() => {
  props.options.forEach((opt, index) => {
    if (opt.is_choosen) activeOption.value = index;
  });
});
</script>
