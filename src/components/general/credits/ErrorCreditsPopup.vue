<template>
  <ModalComponent
    :is_hide="is_hide"
    @close-popup="$emit('closePopup')"
    size="small"
    class="popup-error-credits"
  >
    <template #head> Oops! </template>

    <template #content>
      <div class="popup__row popup__error-icon">
        <IconAlertTriangle class="icon icon--24 icon--red" />
      </div>
      <div class="popup__row">
        <p class="body-16 body--semi">Something went wrong</p>
      </div>
      <div class="popup__row">
        <p class="body-14 body--reg color--white-600">
          We couldn’t complete your credit purchase.<br />Please try again later
          or check your payment details. If the issue persists, feel free to
          contact our support team for assistance.
        </p>
      </div>
      <BaseButton
        text="Try again"
        size="l"
        type="secondary"
        :icon="IconReload"
        :full-width="true"
        @click="() => $emit('closePopup')"
      />
    </template>
  </ModalComponent>
</template>

<script setup>
import { IconAlertTriangle, IconReload } from "@tabler/icons-vue";
import ModalComponent from "../../modals/ModalComponent.vue";
import BaseButton from "../BaseButton.vue";
</script>
