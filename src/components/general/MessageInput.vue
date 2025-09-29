<template>
  <div class="chatbot__message-input">
    <div
      class="message__input flex align--center"
      v-show="!isRecording && !bars.length"
    >
      <IconPaperclip stroke="{2}" />
      <input type="text" placeholder="How can I help?" v-model="message" />
    </div>
    <div class="message__voice" v-show="isRecording || bars.length">
      <div
        v-for="(h, i) in bars"
        :key="i"
        class="bar"
        :style="{
          height: h + '%',
        }"
      ></div>
    </div>
    <div class="message__tools flex justify--between align--end">
      <div class="message__params flex">
        <MessageParamButton
          :icon="IconListSearch"
          name="Deep Research"
          :hideLabel="hideLabels"
        />
        <MessageParamButton
          :icon="IconLayoutGrid"
          name="Agent Style"
          :hideLabel="hideLabels"
        />
        <MessageParamButton
          :icon="IconNetwork"
          name="Select Network"
          :hideLabel="hideLabels"
        />
        <MessageParamButton
          :icon="IconCube3dSphere"
          name="Select Asset"
          :hideLabel="hideLabels"
        />
      </div>
      <div class="message__actions flex">
        <template v-if="bars.length && !isRecording && !isRecordingConfirmed">
          <IconButton
            :icon="IconX"
            type="secondary"
            class="message__action-main"
            @click="bars = []"
          />
          <IconButton
            :icon="IconCheck"
            type="secondary"
            class="message__action-main"
            @click="isRecordingConfirmed = true"
          />
        </template>
        <IconButton
          :icon="VoiceIcon"
          type="secondary"
          class="message__action-main"
          @click="toggleRecording"
          v-if="(bars.length <= 0 && message == '') || isRecording"
        />
        <IconButton
          :icon="IconSend"
          type="primary"
          class="message__action-main"
          @click="sendMessage"
          v-if="message != '' || isRecordingConfirmed"
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
  IconCheck,
  IconX,
} from "@tabler/icons-vue";
import MessageParamButton from "./message-inputs/MessageParamButton.vue";
import IconButton from "./IconButton.vue";
import VoiceIcon from "../icons/VoiceIcon.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  hideLabels: {
    type: Boolean,
    default: false,
  },
});

const message = ref("");

const isRecording = ref(false);
const bars = ref([]);
const isRecordingConfirmed = ref(false);

let audioCtx = null;
let source = null;
let processor = null;
let mediaStream = null;

let lastBarTime = 0;
const barInterval = 100;

function processAudio(event) {
  const now = performance.now();
  if (now - lastBarTime < barInterval) return;
  lastBarTime = now;

  const input = event.inputBuffer.getChannelData(0);
  let sum = 0;

  for (let i = 0; i < input.length; i++) sum += input[i] * input[i];
  const rms = Math.sqrt(sum / input.length);

  const height = Math.max(40, Math.min(100, rms * 500));
  bars.value.push(height);
}

async function startRecording() {
  bars.value = [];

  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = audioCtx.createMediaStreamSource(mediaStream);

  processor = audioCtx.createScriptProcessor(1024, 1, 1);
  source.connect(processor);
  processor.connect(audioCtx.destination);

  processor.onaudioprocess = processAudio;

  isRecording.value = true;
}

function stopRecording() {
  if (processor) {
    processor.disconnect();
    processor.onaudioprocess = null;
    processor = null;
  }
  if (source) {
    source.disconnect();
    source = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach((t) => t.stop());
    mediaStream = null;
  }
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
  isRecording.value = false;
}

function toggleRecording() {
  if (isRecording.value) stopRecording();
  else startRecording();
}

function sendMessage() {
  message.value = "";
  bars.value = [];
  isRecording.value = false;
  isRecordingConfirmed.value = false;

  // SEND MESSAGE FUNCTION HERE
}
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

.chatbot__message-input .message__voice {
  display: flex;
  align-items: center;
  gap: 2px;
  width: 100%;
  height: 20px;
}

.chatbot__message-input .message__voice .bar {
  flex: 0 1 2px;
  background-color: var(--gold-1000, #f2dda6);
  border-radius: 2px;
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

.chatbot__message-input .message__actions .message__action-main.button--icon {
  padding: 0.5625rem;
}

.chatbot__message-input .message__actions .button--icon svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
