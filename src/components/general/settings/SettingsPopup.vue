<template>
  <div v-show="!is_hide">
    <ModalComponent
      :is_hide="currentTab != 'settings'"
      @close-popup="closePopup"
      class="popup-settings"
    >
      <template #head> Settings </template>

      <template #content>
        <div class="popup__scroll-wrapper flex flex--column">
          <div class="settings__group settings__group--account">
            <p class="body-12 body--reg group__title">Account</p>
            <div
              class="group__content credits-bar flex align--center wrap--mobile"
            >
              <div class="bar__icon">
                <AtomIcon />
              </div>
              <div class="bar__email">
                {{ email }}
              </div>
              <div class="bar__credits flex align--center">
                <div class="bar__data flex flex--column justify--between">
                  <p class="body-14 body--reg">5/30 credits</p>
                  <CreditBarLine :credits="56" :max="300" />
                </div>
                <BaseButton text="Buy credits" size="m" />
              </div>
            </div>
          </div>
          <div class="settings__group">
            <p class="body-12 body--reg group__title">Profile access</p>
            <div class="group__content">
              <div
                class="group__field flex align--center justify--between flex--column--mobile align--start--mobile"
              >
                <p class="body-14 body--reg field__label">Email</p>
                <BaseInput
                  v-model="email"
                  :icon="IconEdit"
                  icon-position="right"
                  class="button-email-edit field__input"
                  :readonly="true"
                  @click="currentTab = 'email'"
                />
              </div>
              <div
                class="group__field flex align--center justify--between flex--column--mobile align--start--mobile"
              >
                <p class="body-14 body--reg field__label">Password</p>
                <div class="field__content">
                  <BaseButton
                    text="Change password"
                    type="ghost"
                    size="m"
                    @click="currentTab = 'password'"
                  />
                </div>
              </div>
              <div
                class="group__field flex align--center justify--between flex--column--mobile align--start--mobile"
              >
                <p class="body-14 body--reg field__label">
                  Connect with Google
                </p>
                <div class="field__content">
                  <BaseButton
                    text="Connect"
                    type="secondary"
                    size="l"
                    @click="currentTab = 'password'"
                    class="button--google"
                    :full-width="true"
                    :icon="GoogleIcon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="settings__group settings__group-personalization">
            <p class="body-12 body--reg group__title">Personalization</p>
            <div class="group__content">
              <div
                class="group__field flex align--center justify--between flex--column--mobile align--start--mobile"
              >
                <p class="body-14 body--reg field__label">Theme</p>
                <BaseSelect
                  v-model="theme"
                  :options="themeOptions"
                  :icon="IconMoon"
                />
              </div>
            </div>
          </div>
          <div class="settings__group settings__group-notification">
            <p class="body-12 body--reg group__title">Notification</p>
            <div class="group__content">
              <div class="group__field flex align--start justify--between">
                <div class="field__label">
                  <p class="body-14 body--reg">Push Notifications</p>
                  <p class="body-12 body--reg field__label-hint">
                    Receive real-time updates and alerts
                  </p>
                </div>
                <BaseSwitcher v-model="pushNotification" />
              </div>
              <div class="group__field flex align--start justify--between">
                <div class="field__label">
                  <p class="body-14 body--reg">Sound Settings</p>
                  <p class="body-12 body--reg field__label-hint">
                    Adjust sound preferences for notifications
                  </p>
                </div>
                <BaseSwitcher v-model="soundSettings" />
              </div>
            </div>
          </div>
          <div class="settings__group">
            <p class="body-12 body--reg group__title">Privacy Settings</p>
            <div class="group__content">
              <div
                class="group__field flex align--center justify--between flex--column--mobile align--start--mobile"
              >
                <div class="field__label">
                  <p class="body-14 body--reg">Chat History</p>
                  <p class="body-12 body--reg field__label-hint">
                    Manage the retention of your chat logs
                  </p>
                </div>
                <BaseSelect
                  v-model="chatHistory"
                  :options="chatHistoryOptions"
                />
              </div>
              <div
                class="group__field flex align--center justify--between flex--column--mobile align--start--mobile"
              >
                <div class="field__label">
                  <p class="body-14 body--reg">Data Sharing</p>
                  <p class="body-12 body--reg field__label-hint">
                    Permissions for sharing data with third parties
                  </p>
                </div>
                <BaseSelect
                  v-model="dataSharing"
                  :options="dataSharingOptions"
                />
              </div>
            </div>
          </div>
          <BaseButton
            text="Delete account"
            :full-width="true"
            type="secondary"
            :icon="IconTrash"
            class="button--delete"
            @click="currentTab = 'delete-account'"
          />
        </div>
      </template>
    </ModalComponent>

    <EmailSettings
      :is_hide="currentTab != 'email'"
      @change-popup="changePopup"
      @close-popup="closePopup"
    />

    <VerifyCodeSettings
      :is_hide="currentTab != 'verify-code'"
      @change-popup="changePopup"
      @close-popup="closePopup"
    />

    <PasswordSettings
      :is_hide="currentTab != 'password'"
      @change-popup="changePopup"
      @close-popup="closePopup"
    />

    <DeleteAccountSettings
      :is_hide="currentTab != 'delete-account'"
      @change-popup="changePopup"
      @close-popup="closePopup"
    />
  </div>
</template>

<script setup>
import { IconEdit, IconMoon, IconTrash } from "@tabler/icons-vue";
import ModalComponent from "../../modals/ModalComponent.vue";

import BaseInput from "../BaseInput.vue";
import BaseSelect from "../BaseSelect.vue";
import BaseButton from "../BaseButton.vue";
import BaseSwitcher from "../BaseSwitcher.vue";

import { ref } from "vue";
import EmailSettings from "./EmailSettings.vue";
import VerifyCodeSettings from "./VerifyCodeSettings.vue";
import PasswordSettings from "./PasswordSettings.vue";
import DeleteAccountSettings from "./DeleteAccountSettings.vue";

import GoogleIcon from "../../icons/GoogleIcon.vue";
import AtomIcon from "../../icons/AtomIcon.vue";
import CreditBarLine from "../CreditBarLine.vue";

const currentTab = ref("settings");

const email = ref("johndoe@gmail.com");

const chatHistory = ref("after-30-days");
const chatHistoryOptions = [
  {
    label: "Delete after 30 days",
    value: "after-30-days",
  },
  {
    label: "Delete after 14 days",
    value: "after-14-days",
  },
  {
    label: "Delete after 7 days",
    value: "after-7-days",
  },
];

const dataSharing = ref("allow-data-sharing");
const dataSharingOptions = [
  {
    label: "Allow data sharing with third parties",
    value: "allow-data-sharing",
  },
  {
    label: "Don`t Allow data sharing with third parties",
    value: "not-allow-data-sharing",
  },
];

const pushNotification = ref(true);
const soundSettings = ref(false);

const theme = ref("dark");
const themeOptions = [
  {
    label: "Dark",
    value: "dark",
  },
  {
    label: "Light",
    value: "light",
  },
];

const props = defineProps({
  is_hide: Boolean,
});

const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
  currentTab.value = "settings";
};

const changePopup = (tab = "settings") => {
  currentTab.value = tab;
};
</script>

<style scoped>
.popup.popup-settings .popup__content {
  gap: 1rem;
}
.popup.popup-settings .popup__content .button--delete {
  margin-top: 1rem;
  color: var(--red-error, #eb4f4f);
}
.popup.popup-settings .popup__content .button--delete:deep(svg) {
  stroke: var(--red-error, #eb4f4f);
}
.popup.popup-settings
  .popup__content
  .settings__group-personalization
  .group__content {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.popup.popup-settings
  .popup__content
  .settings__group--account
  .group__content {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.popup.popup-settings .credits-bar {
  gap: 0.5rem;
}

.popup.popup-settings .credits-bar .bar__icon {
  padding: 0.46875rem;
  border-radius: 100%;
  border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: var(--sidebar, #131318);
  cursor: pointer;
}

.popup.popup-settings .credits-bar .bar__icon svg {
  width: 1.5625rem;
  height: 1.5625rem;
  display: block;
}

.popup.popup-settings .credits-bar .bar__email,
.popup.popup-settings .credits-bar .bar__credits {
  flex: 1 1 100%;
}

.popup.popup-settings .credits-bar .bar__credits {
  gap: 1.5rem;
}

.popup.popup-settings .credits-bar .bar__data {
  flex: 1 1 auto;
  height: 2rem;
}

.popup.popup-settings .credits-bar .bar__data .credits-bar-line {
  height: 0.25rem;
}

.popup.popup-settings .credits-bar .bar__data .credits-bar-line:deep(svg) {
  width: 100%;
  height: 0.25rem;
  position: relative;
  border-radius: 6px;
}

@media screen and (max-width: 767px) {
  .popup.popup-settings:deep(.popup__body) {
    height: 80.76%;
  }

  .popup.popup-settings .credits-bar {
    gap: 0.5rem;
  }

  .popup.popup-settings .credits-bar .bar__icon {
    padding: 0.46875rem;
    border-radius: 100%;
    border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
    background: var(--sidebar, #131318);
    cursor: pointer;
  }

  .popup.popup-settings .credits-bar .bar__icon svg {
    width: 1.5625rem;
    height: 1.5625rem;
    display: block;
  }

  .popup.popup-settings .credits-bar .bar__email,
  .popup.popup-settings .credits-bar .bar__credits {
    flex: 1 1 auto;
  }

  .popup.popup-settings .credits-bar .bar__credits {
    width: 100%;
    gap: 1.5rem;
  }
}
</style>
