<script setup>
import { IconCheck, IconX } from "@tabler/icons-vue";
import { useToast } from "../../composables/useToast";

defineProps({
  toastId: {
    required: true,
    type: String,
  },
  message: {
    required: false,
    type: Object,
  },
  visibility: {
    required: true,
    type: Boolean,
  },
});

const { removeMessage } = useToast();
</script>

<template>
  <div v-if="visibility" class="toast flex flex--column gap--8">
    <div class="flex justify--between align--center">
      <div
        :class="`toast__icon toast__icon--${message?.type} flex align--center justify--center`"
      >
        <IconCheck class="icon icon--12" v-if="message?.type == 'success'" />
        <IconX class="icon icon--12" v-if="message?.type == 'error'" />
      </div>
      <IconX
        class="icon icon--16 toast__close"
        @click="removeMessage(message?.id)"
      />
    </div>
    <p class="body-16 body--semi">{{ message?.title }}</p>
    <p class="body-16 body--reg color--white-600" v-html="message?.text"></p>
  </div>
</template>
