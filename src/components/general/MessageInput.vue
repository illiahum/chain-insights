<template>
  <div class="chatbot__message-input">
    <div class="message__input flex align--center">
      <IconPaperclip stroke="{2}" />
      <input type="text" placeholder="How can I help?" />
    </div>
    <div class="message__tools flex justify--between align--end">
      <div class="message__params flex">
        <MessageParamButton :icon="IconListSearch" name="Deep Research" />
        <MessageParamButton :icon="IconLayoutGrid" name="Agent Style" />
        <MessageParamButton :icon="IconNetwork" name="Select Network" />
        <MessageParamButton :icon="IconCube3dSphere" name="Select Asset" />
      </div>
      <div class="message__actions flex">
        <IconButton :icon="VoiceIcon" type="secondary" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  IconPaperclip,
  IconListSearch,
  IconLayoutGrid,
  IconNetwork,
  IconCube3dSphere,
} from "@tabler/icons-vue";
import MessageParamButton from "./message-inputs/MessageParamButton.vue";
import IconButton from "./IconButton.vue";
import VoiceIcon from "../icons/VoiceIcon.vue";
</script>

<style>
.chatbot__message-input {
  position: absolute;
  bottom: 2.5rem;

  padding: 1.25rem;
  border-radius: 1.25rem;

  border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: linear-gradient(
      172deg,
      rgba(71, 120, 234, 0) -30.31%,
      rgba(71, 120, 234, 0.07) 124.3%
    ),
    rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(18.049999237060547px);
}

.chatbot__message-input .message__input {
  gap: 1rem;
}

.chatbot__message-input .message__input input {
  width: 100%;
  border: none;
  background-color: transparent;
}

.chatbot__message-input .message__input svg {
  width: 1.25rem;
  height: 1.25rem;
}

.chatbot__message-input .message__params {
  gap: 0.5625rem;
  margin-top: 2.5rem;
}

.chatbot__message-input .message__button {
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: var(--white-40, rgba(255, 255, 255, 0.04));
  gap: 0.5rem;
  backdrop-filter: blur(7.349999904632568px);
}

.chatbot__message-input .message__button svg {
  width: 1rem;
  height: 1rem;
}

.chatbot__message-input .message__actions {
  gap: 0.5rem;
}

.chatbot__message-input .message__actions .button--icon {
  border-radius: 0.75rem;
}

.chatbot__message-input .message__actions .button--icon svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
