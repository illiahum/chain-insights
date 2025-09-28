<template>
  <div v-show="!is_hide">
    <LoginPopup
      :is_hide="currentTab != 'login'"
      @close-popup="$emit('closePopup')"
      @change-popup="changePopup"
    />
    <SignupPopup
      :is_hide="currentTab != 'signup'"
      @close-popup="$emit('closePopup')"
      @change-popup="changePopup"
    />
    <ResetPasswordPopup
      :is_hide="currentTab != 'reset-password'"
      @close-popup="$emit('closePopup')"
      @change-popup="changePopup"
    />
  </div>
</template>

<script setup>
import LoginPopup from "./LoginPopup.vue";
import SignupPopup from "./SignupPopup.vue";
import ResetPasswordPopup from "./ResetPasswordPopup.vue";

import { ref } from "vue";

const currentTab = ref("login");

const props = defineProps({
  is_hide: Boolean,
});

const changePopup = (tab = "login") => {
  currentTab.value = tab;
};
</script>
