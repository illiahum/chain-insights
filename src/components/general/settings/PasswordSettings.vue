<template>
  <ModalComponent
    :is_hide="is_hide"
    :show_back="true"
    @close-popup="$emit('closePopup')"
    @change-popup="$emit('changePopup')"
    size="small"
    class="popup-settings popup-settings-password"
  >
    <template #head> Change password </template>

    <template #content>
      <div class="settings__row flex flex--column">
        <BaseInput
          v-model="currentPassword"
          type="password"
          placeholder="Your current password"
          label="Current password"
        />
      </div>
      <div class="settings__row flex flex--column">
        <BaseInput
          v-model="newPassword"
          type="password"
          placeholder="Your new password"
          label="Create new password"
        />
      </div>
      <div class="settings__row flex flex--column">
        <BaseInput
          v-model="confirmedNewPassword"
          type="password"
          placeholder="Repeat new password"
          label="Repeat new password"
        />
      </div>
      <div class="settings__row">
        <BaseButton
          text="Set new password"
          :full-width="true"
          @click="() => $emit('changePopup', 'settings')"
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
const currentPassword = ref("");
const newPassword = ref("");
const confirmedNewPassword = ref("");

const props = defineProps({
  is_hide: Boolean,
});

defineEmits(["closePopup", "changePopup"]);

const openEmailModal = () => {
  isEmailModalShow.value = !isEmailModalShow.value;
};
</script>
