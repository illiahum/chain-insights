<template>
  <ModalComponent
    :is_hide="is_hide"
    :show_back="true"
    @close-popup="$emit('closePopup')"
    @change-popup="$emit('changePopup')"
    size="small"
    class="popup-settings popup-settings-email"
  >
    <template #head> Change email </template>

    <template #content>
      <div class="settings__row settings__group">
        <div class="group__content">
          <div class="email-setting__current-email flex flex--column">
            <p class="body-16 body--reg">Your current Email:</p>
            <p class="body-16 body--reg">johndoe@gmail.com</p>
          </div>
        </div>
      </div>
      <div class="settings__row flex flex--column">
        <BaseInput
          v-model="newEmail"
          placeholder="Your new email"
          label="New email"
          :hint="true"
        >
          <template #hint>
            <IconInfoCircle class="icon icon--16" />
            A confirmation email will be sent to your new email address.
          </template>
        </BaseInput>
      </div>
      <div class="settings__row">
        <BaseButton
          text="Send verify code"
          :full-width="true"
          @click="() => $emit('changePopup', 'verify-code')"
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
import { ref } from "vue";

const isEmailModalShow = ref(false);
const newEmail = ref("");

const props = defineProps({
  is_hide: Boolean,
});

defineEmits(["closePopup", "changePopup"]);

const openEmailModal = () => {
  isEmailModalShow.value = !isEmailModalShow.value;
};
</script>

<style scoped>
.popup-settings.popup-settings-email .popup__content {
  gap: 2rem;
}
.popup-settings.popup-settings-email
  .email-setting__current-email
  > p:first-of-type {
  color: var(--white-600, rgba(255, 255, 255, 0.6));
  margin-bottom: 0.5rem;
}
</style>
