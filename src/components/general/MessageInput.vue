<template>
  <div class="chatbot__message-input">
    <div
      class="message__attachment hide--desktop"
      @click="() => (isShowAdvencedPopup = !isShowAdvencedPopup)"
    >
      <IconPlus class="icon icon--16" />
    </div>
    <div class="message__input flex align--center">
      <IconPaperclip stroke="{2}" class="hide--mobile" />
      <div
        contenteditable="true"
        class="input"
        @input="onInput"
        @focus="() => (isInputFocused = true)"
        @blur="() => (isInputFocused = false)"
        ref="messageInput"
      >
        <p
          class="body-14 body--reg color--white-600"
          v-if="message == '' && !isInputFocused"
        >
          How can I help?
        </p>
      </div>
      <IconSend class="icon icon--20 icon--white--600 hide--desktop" />
    </div>
    <div
      class="message__tools flex justify--between align--end"
      v-if="!isMobile"
    >
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

    <Teleport to="body" v-if="isMobile">
      <ModalComponent
        :is_hide="!isShowAdvencedPopup"
        @close-popup="() => (isShowAdvencedPopup = !isShowAdvencedPopup)"
        class="popup-advanced-option"
      >
        <template #head> Advanced options </template>

        <template #content>
          <div class="popup__row popup__row--buttons flex gap--8">
            <button class="flex flex--column align--center justify--center">
              <IconCamera class="icon icon--16 mb--8" />
              <p class="body-14 body--reg">Camera</p>
            </button>
            <button class="flex flex--column align--center justify--center">
              <IconPhoto class="icon icon--16 mb--8" />
              <p class="body-14 body--reg">Photos</p>
            </button>
            <button class="flex flex--column align--center justify--center">
              <IconFile class="icon icon--16 mb--8" />
              <p class="body-14 body--reg">Camera</p>
            </button>
          </div>
          <div class="popup__row popup__fields flex flex--column gap--8">
            <BaseCheckbox
              :icon="IconListSearch"
              label="Deep Research"
              icon-size="16"
              :hide-label="hideLabels"
              v-model="deepResearch"
            />
            <BaseSelect2
              v-model="agentStyle"
              :options="agentStyleOptions"
              label="Agent Style"
              :icon="IconLayoutGrid"
              icon-size="16"
            />
            <BaseSelect2
              v-model="network"
              :options="networkOptions"
              label="Select Network"
              :icon="IconNetwork"
              icon-size="16"
            />
            <BaseSelect2
              v-model="asset"
              :options="assetOptions"
              label="Select Asset"
              :icon="IconCube3dSphere"
              icon-size="16"
            />
          </div>
        </template>
      </ModalComponent>
    </Teleport>
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
  IconPlus,
  IconCamera,
  IconPhoto,
  IconFile,
} from "@tabler/icons-vue";
import IconButton from "./IconButton.vue";
import { onBeforeUnmount, onMounted, onUnmounted, ref, Teleport } from "vue";
import BaseSelect from "./BaseSelect.vue";
import BaseSelect2 from "./BaseSelect2.vue";
import BaseCheckbox from "./BaseCheckbox.vue";
import ModalComponent from "../modals/ModalComponent.vue";
import { useChatsStore } from "../../stores/chats";

const props = defineProps({
  hideLabels: {
    type: Boolean,
    default: false,
  },
});

const message = ref("");
const deepResearch = ref(false);
const agentStyle = ref("style-1");
const network = ref("network-1");
const asset = ref("asset-1");

const agentStyleOptions = [
  {
    label: "Agent style 1",
    value: "style-1",
    text: "Agent style description",
  },
  {
    label: "Agent style 2",
    value: "style-2",
    text: "Agent style description",
  },
  {
    label: "Agent style 3",
    value: "style-3",
    text: "Agent style description",
  },
];

const networkOptions = [
  {
    label: "Network 1",
    value: "network-1",
    text: "Network description",
  },
  {
    label: "Network 2",
    value: "network-2",
    text: "Network description",
  },
  {
    label: "Network 3",
    value: "network-3",
    text: "Network description",
  },
];

const assetOptions = [
  {
    label: "Asset 1",
    value: "asset-1",
    text: "Asset description",
  },
  {
    label: "Asset 2",
    value: "asset-2",
    text: "Asset description",
  },
  {
    label: "Asset 3",
    value: "asset-3",
    text: "Asset description",
  },
];

const isMobile = ref(false);
const isInputFocused = ref(false);
const isShowAdvencedPopup = ref(false);
const messageInput = ref(null);

const chatsStore = useChatsStore();

const checkScreen = () => {
  isMobile.value = window.innerWidth <= 768;
};

function onInput(event) {
  message.value = event.target.innerText;
}

function sendMessage() {
  chatsStore.sendMessage(message.value);

  message.value = "";
  messageInput.value.innerText = "";
}

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<style>
.chatbot__message-input {
  position: absolute;
  bottom: 2.5rem;
  right: 9.375rem;
  left: 9.375rem;

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

.chatbot__message-input .message__input .input {
  width: 100%;
  height: auto;
  border: none;
  background-color: transparent;
  white-space: pre-wrap;
  word-break: break-word;
}

.chatbot__message-input .message__input .input:focus {
  outline: none;
}

.chatbot__message-input .message__input svg {
  flex-shrink: 0;
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

@media screen and (min-width: 1921px) {
  .chatbot__message-input {
    right: 12.5rem;
    left: 12.5rem;
  }
}

@media screen and (max-width: 767px) {
  .chatbot__message-input {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    width: 100vw;

    padding: 1rem 1rem 1.5rem;

    border-radius: 0px;

    border: none;
    border-top: 1px solid var(--white-50, rgba(255, 255, 255, 0.05));

    background: linear-gradient(180deg, rgba(10, 12, 17, 0.2) 0%, #0a0c11 100%);
    backdrop-filter: blur(5px);

    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .chatbot__message-input .message__attachment {
    flex-shrink: 0;
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(7.349999904632568px);
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chatbot__message-input .message__input {
    flex: 1 1 auto;
    border-radius: 999px;
    border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
    background: linear-gradient(
        172deg,
        rgba(255, 255, 255, 0) -30.31%,
        rgba(255, 255, 255, 0.04) 124.3%
      ),
      rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(18.049999237060547px);
    padding: 0px 1.25rem;
    min-height: 3rem;
  }

  .chatbot__message-input .message__input textarea {
    width: 100%;
    border: none;
    background-color: transparent;
  }

  .chatbot__message-input .message__input svg {
    transform: rotate(45deg);
  }

  .popup-advanced-option .popup__row--buttons {
    border-radius: 1rem;
    background: var(--white-50, rgba(255, 255, 255, 0.05));
  }

  .popup-advanced-option .popup__row--buttons button {
    position: relative;
    flex: 1 1 5.75rem;
    padding: 1rem 0.5rem;
    color: var(--white-1000, rgba(255, 255, 255, 1));
  }

  .popup-advanced-option .popup__row--buttons button + button::before {
    display: block;
    content: "";

    width: 1px;
    height: 2.5625rem;
    background: var(--white-20, rgba(255, 255, 255, 0.02));

    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
  }

  .popup-advanced-option .popup__fields .field.field--checkbox label {
    background: transparent;
    border: none;
    padding: 0px 0.5rem;
    height: 2.5rem;
  }

  .popup-advanced-option
    .popup__fields
    .field.field--checkbox
    label:has(input:checked) {
    background: var(--gold-100, rgba(242, 221, 166, 0.1));
  }
}
</style>
