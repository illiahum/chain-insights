<template>
  <div
    class="chatbot__sidebar-top--mobile hide--desktop flex align--center justify--between"
    :class="{
      'chatbot__sidebar--open--mobile': isMobileOpen,
    }"
  >
    <div class="sidebar__logo flex align--center gap--16">
      <button @click="() => (isMobileOpen = !isMobileOpen)">
        <IconMenu2
          class="icon icon--24 icon--white--1000"
          v-if="!isMobileOpen"
        />
        <IconX class="icon icon--24 icon--white--1000" v-else />
      </button>
      <MainLogo />
    </div>
    <div class="sidebat__new-chat">
      <IconMessagePlus class="icon icon--24 icon--white--1000" />
    </div>
  </div>
  <div
    class="chatbot__sidebar flex flex--column"
    :class="{
      'chatbot__sidebar--open--mobile': isMobileOpen,
    }"
  >
    <div class="sidebar__top flex flex--column hide--tablet">
      <div class="sidebar__logo flex justify--between align--center">
        <div class="flex align--center gap--16">
          <button class="hide--desktop">
            <IconMenu2 class="icon icon--24 icon--white--1000" />
          </button>
          <MainLogo />
        </div>
        <button class="hide--tablet">
          <SidebarHideIcon />
        </button>
      </div>
    </div>

    <div class="sidebar__content flex flex--column">
      <SearchButton />

      <ChatButtons @click="() => (isMobileOpen = !isMobileOpen)" />

      <div
        class="sidebar__bottom flex flex--column"
        v-if="currentUser.currentUser?.id"
      >
        <BaseButton
          :icon="IconMessagePlus"
          text="New Chat"
          :full-width="true"
          type="secondary"
        />

        <CreditsBar />
      </div>
      <div class="sidebar__bottom flex flex--column" v-else>
        <div class="sidebar__login-message flex flex--column mb-24">
          <IconLockOpen class="icon icon--24 icon--gold" />

          <p class="body-14 body--semi color--gold">Unlock All Chat Features</p>

          <p class="body-14 body--reg">
            Log in to your profile to unlock all chat features, ensure secure
            interactions, and receive 100 FREE credits!
          </p>
        </div>

        <BaseButton
          :icon="IconUser"
          text="Log in"
          :full-width="true"
          @click="showAuthPopup = !showAuthPopup"
          type="primary"
        />
      </div>
    </div>
  </div>

  <Teleport to="body">
    <AuthPopup
      :is_hide="!showAuthPopup"
      @close-popup="showAuthPopup = !showAuthPopup"
    />
  </Teleport>
</template>

<script setup>
import {
  IconLockOpen,
  IconMenu2,
  IconMessagePlus,
  IconUser,
  IconX,
} from "@tabler/icons-vue";
import BaseButton from "./general/BaseButton.vue";
import MainLogo from "./general/MainLogo.vue";
import SidebarHideIcon from "./icons/SidebarHideIcon.vue";
import ChatButtons from "./sidebar/ChatButtons.vue";
import SearchButton from "./sidebar/SearchButton.vue";
import CreditsBar from "./general/CreditsBar.vue";
import { useUserStore } from "../stores/user";

import AuthPopup from "./general/auth/AuthPopup.vue";
import { ref, Teleport, watch } from "vue";

const currentUser = useUserStore();

const showAuthPopup = ref(false);
const isMobileOpen = ref(false);
</script>

<style scoped>
.chatbot__sidebar {
  position: relative;
  flex: 0 0 23.75rem;
  height: 100dvh;
  max-height: 100dvh;

  border-right: 1px solid rgba(175, 175, 175, 0.4);
  background: linear-gradient(
      180deg,
      rgba(71, 120, 234, 0) 88.61%,
      rgba(71, 120, 234, 0.02) 100%
    ),
    linear-gradient(
      86deg,
      rgba(255, 255, 255, 0) 33.05%,
      rgba(255, 255, 255, 0.02) 119.31%
    ),
    var(--sidebar-color, #131318);
  backdrop-filter: blur(0.53125rem);

  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  gap: 2rem;
}

@media screen and (min-width: 1921px) {
  .chatbot__sidebar {
    flex: 0 0 35rem;
  }
}

.chatbot__sidebar .sidebar__top {
  gap: 2rem;
}

.chatbot__sidebar .sidebar__content,
.chatbot__sidebar .sidebar__content .sidebar__chats {
  flex: 1 1 auto;
}

.chatbot__sidebar .sidebar__content {
  gap: 2rem;
}

.chatbot__sidebar .sidebar__bottom {
  flex: 0 0 auto;
  gap: 1.5rem;
}

.chatbot__sidebar .sidebar__bottom .sidebar__login-message {
  border-radius: 1.25rem;
  border: 1px solid var(--gold-1000, #f2dda6);
  background: var(--gold-100, rgba(242, 221, 166, 0.1));
  padding: 1.25rem 1rem;
  gap: 0.5rem;
}

@media screen and (max-width: 1023px) {
  .chatbot__sidebar {
    flex: 0 0 auto;
    height: auto;
    border-right: none;
    padding: 0px;
  }
}

@media screen and (max-width: 767px) {
  .chatbot__sidebar-top--mobile {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    padding: 1rem;
    z-index: 10;
    height: auto;
    border-bottom: 1px solid rgba(175, 175, 175, 0.4);
    background: var(--background-color-2, #0a0c11);
  }

  .chatbot__sidebar-top--mobile.chatbot__sidebar--open--mobile {
    left: 83.59%;
  }

  .chatbot__sidebar {
    display: none;
  }

  .chatbot__sidebar.chatbot__sidebar--open--mobile {
    display: flex;
    flex: 0 0 83.59%;
  }

  /* .chatbot__sidebar.chatbot__sidebar--open--mobile::before {
    content: "";
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    opacity: 0.8;
    background: var(--background-color, #18181a);
  } */

  .chatbot__sidebar .sidebar__content {
    padding: 1rem;
  }
}
</style>
