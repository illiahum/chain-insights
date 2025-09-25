<template>
  <ModalComponent
    :is_hide="is_hide"
    :show_back="true"
    @close-popup="$emit('closePopup')"
    @change-popup="$emit('changePopup')"
    size="small"
    class="popup-settings popup-verify-code"
  >
    <template #head> Enter verify code </template>

    <template #content>
      <div class="settings__row">
        <p class="body-16 body--reg">
          A confirmation code has been sent to your email address
          (johndoe@gmail.com). <br />Please enter the code:
        </p>
      </div>
      <div class="settings__row">
        <p class="body-16 body--reg color--gold">
          Resend code <span v-show="timeLeft > 0">{{ formattedTime }}</span>
        </p>
      </div>
      <div class="settings__row settings__code flex">
        <BaseInput v-model="codePart1" />
        <BaseInput v-model="codePart2" />
        <BaseInput v-model="codePart3" />
        <BaseInput v-model="codePart4" />
      </div>
      <div class="settings__row">
        <BaseButton
          text="Confirm"
          :full-width="true"
          :disabled="isButtonDisabled"
          @click="$emit('changePopup', 'settings')"
        />
      </div>
    </template>
  </ModalComponent>
</template>

<script setup>
import { IconEdit, IconInfoCircle } from "@tabler/icons-vue";
import ModalComponent from "../../modals/ModalComponent.vue";

import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const isEmailModalShow = ref(false);
const isButtonDisabled = ref(true);

const codePart1 = ref("");
const codePart2 = ref("");
const codePart3 = ref("");
const codePart4 = ref("");

const finalCode = computed(() => {
  return codePart1.value + codePart2.value + codePart3.value + codePart4.value;
});

watch(finalCode, (newValue, oldValue) => {
  if (newValue != "") {
    isButtonDisabled.value = false;
  } else {
    isButtonDisabled.value = true;
  }
});

const props = defineProps({
  is_hide: Boolean,
});

defineEmits(["closePopup", "changePopup"]);

const openEmailModal = () => {
  isEmailModalShow.value = !isEmailModalShow.value;
};

const timeLeft = ref(0);
const isRunning = ref(false);
let intervalId = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

function startTimer() {
  if (isRunning.value) return;

  timeLeft.value = 60;
  isRunning.value = true;

  intervalId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  isRunning.value = false;
  clearInterval(intervalId);
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.popup-settings.popup-verify-code .settings__row + .settings__row {
  margin-top: 2rem;
}

.popup-settings.popup-verify-code .settings__code {
  gap: 1.5rem;
}

.popup-settings.popup-verify-code .settings__code .field {
  flex: 1 1 100%;
}

.popup-settings.popup-verify-code .settings__code .field:deep(input) {
  text-align: center;
}
</style>
