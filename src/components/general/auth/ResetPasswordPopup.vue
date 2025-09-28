<template>
  <ModalComponent
    :is_hide="is_hide"
    @close-popup="$emit('closePopup')"
    @change-popup="$emit('changePopup', 'login')"
    size="small"
    class="popup-auth"
    :show_back="true"
  >
    <template #head> Reset password </template>

    <template #content>
      <div class="popup__row">
        <BaseInput
          v-model="email"
          type="email"
          placeholder="Your email"
          label="Email"
        />
      </div>
      <div class="popup__row">
        <p class="body-16 body--reg color--white-600">
          Enter your email to reset your password, then follow the instructions
          in the email.
        </p>
      </div>
      <div class="popup__row">
        <BaseButton
          size="l"
          :full-width="true"
          text="Reset password"
          type="secondary"
          :disabled="timeLeft > 0"
          @click="emailResend"
        />
        <p
          v-if="timeLeft > 0"
          class="body-12 body--reg color--white-600 mt--16 text--center"
        >
          Resend email in {{ formattedTime }}s
        </p>
      </div>
    </template>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from "../../modals/ModalComponent.vue";

import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";

import { computed, ref } from "vue";

const props = defineProps({
  is_hide: Boolean,
});

const email = ref("");

const timeLeft = ref(0);
const isTimerRunning = ref(false);
let intervalId = null;

const emailResend = function () {
  // PASTE CODE FOR EMAIL SENDING
  if (email.value != "") startTimer();
};

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

function startTimer() {
  if (isTimerRunning.value) return;

  timeLeft.value = 60;
  isTimerRunning.value = true;

  intervalId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  isTimerRunning.value = false;
  clearInterval(intervalId);
}
</script>
