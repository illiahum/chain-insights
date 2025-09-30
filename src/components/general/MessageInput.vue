<template>
  <div class="chatbot__message-input">
    <div class="message__input flex align--center">
      <IconPaperclip stroke="{2}" />
      <input type="text" placeholder="How can I help?" v-model="message" />
    </div>
    <div class="message__tools flex justify--between align--end">
      <div
        :class="`message__params flex ${
          hideLabels ? 'message__params-hide-labels' : ''
        }`"
      >
        <BaseCheckbox
          :icon="IconListSearch"
          label="Deep Research"
          icon-size="16"
          :hide-label="hideLabels"
          v-model="deepResearch"
        />
        <BaseSelect
          v-model="agentStyle"
          :options="agentStyleOptions"
          defaultName="Agent Style"
          :icon="IconLayoutGrid"
          icon-size="16"
          :hide-label="hideLabels"
          options-position="top"
        />
        <BaseSelect
          v-model="network"
          :options="networkOptions"
          defaultName="Select Network"
          :icon="IconNetwork"
          icon-size="16"
          :hide-label="hideLabels"
          options-position="top"
        />
        <BaseSelect
          v-model="asset"
          :options="assetOptions"
          defaultName="Select Asset"
          :icon="IconCube3dSphere"
          icon-size="16"
          :hide-label="hideLabels"
          options-position="top"
        />
      </div>
      <div class="message__actions flex">
        <IconButton
          :icon="IconSend"
          :type="message != '' ? 'primary' : 'secondary'"
          class="message__action-main"
          @click="sendMessage"
        />
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
  IconSend,
} from "@tabler/icons-vue";
import IconButton from "./IconButton.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import BaseSelect from "./BaseSelect.vue";
import BaseCheckbox from "./BaseCheckbox.vue";

const props = defineProps({
  hideLabels: {
    type: Boolean,
    default: false,
  },
});

const message = ref("");
const deepResearch = ref(false);
const agentStyle = ref("");
const network = ref("");
const asset = ref("");

const agentStyleOptions = [
  {
    label: "Agent style 1",
    value: "style-1",
  },
  {
    label: "Agent style 2",
    value: "style-2",
  },
  {
    label: "Agent style 3",
    value: "style-3",
  },
];

const networkOptions = [
  {
    label: "Network 1",
    value: "network-1",
  },
  {
    label: "Network 2",
    value: "network-2",
  },
  {
    label: "Network 3",
    value: "network-3",
  },
];

const assetOptions = [
  {
    label: "Asset 1",
    value: "asset-1",
  },
  {
    label: "Asset 2",
    value: "asset-2",
  },
  {
    label: "Asset 3",
    value: "asset-3",
  },
];
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

.chatbot__message-input .message__params .field--select .field__input,
.chatbot__message-input .message__params .field--checkbox label {
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: var(--white-40, rgba(255, 255, 255, 0.04));
  gap: 0.5rem;
  backdrop-filter: blur(0.4375rem);
  border-color: transparent;
  height: auto;
}

.chatbot__message-input .message__params .field--select .field__input,
.chatbot__message-input .message__params .field--checkbox label {
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: var(--white-40, rgba(255, 255, 255, 0.04));
  gap: 0.5rem;
  backdrop-filter: blur(0.4375rem);
  border-color: transparent;
  height: auto;
}

.chatbot__message-input .message__actions {
  gap: 0.5rem;
}

.chatbot__message-input .message__actions .button--icon {
  border-radius: 0.75rem;
}

.chatbot__message-input .message__actions .message__action-main.button--icon {
  padding: 0.5625rem;
}

.chatbot__message-input .message__actions .button--icon svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
