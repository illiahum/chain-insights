<template>
  <div :class="classes">
    <div class="message__text flex flex--column">
      To continue using the chat features, please log in to your profile.
      <br />Rest assured, this process is completely safe and secure.<br />Your
      data will remain private and protected.<br />Log in and get 100 free
      credits!
    </div>
    <BaseButton
      size="m"
      :icon="IconNorthStar"
      text="Claim your 100 Free credits now!"
      class="message__login-button message__button"
    />
    <div
      v-if="msg?.author == 'bot' && msg?.type != 'options'"
      class="message__actions flex"
    >
      <div class="message__action">
        <IconReload />
      </div>
      <div class="message__action">
        <IconCopy />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { IconCopy, IconNorthStar, IconReload } from "@tabler/icons-vue";
import BaseButton from "../general/BaseButton.vue";

const props = defineProps({
  id: String,
  msg: Object,
  class: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  let classes = `${props.class} chat__message chat__message--${props.msg?.type} chat__message--${props.msg?.author} flex flex--column`;

  return classes;
});
</script>
