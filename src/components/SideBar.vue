<template>
  <div class="chatbot__sidebar flex flex--column">
    <div class="sidebar__top flex flex--column">
      <div class="sidebar__logo flex justify--between align--center">
        <MainLogo />
        <button>
          <SidebarHideIcon />
        </button>
      </div>

      <SearchButton />

      <ChatButtons />
    </div>

    <div class="sidebar__bottom flex flex--column">
      <BaseButton
        :icon="IconMessagePlus"
        text="New Chat"
        :full-width="true"
        type="secondary"
      />

      <CreditsBar />
    </div>
  </div>
</template>

<script setup>
import { IconMessagePlus } from "@tabler/icons-vue";
import BaseButton from "./general/BaseButton.vue";
import MainLogo from "./general/MainLogo.vue";
import SidebarHideIcon from "./icons/SidebarHideIcon.vue";
import ChatButtons from "./sidebar/ChatButtons.vue";
import SearchButton from "./sidebar/SearchButton.vue";
import CreditsBar from "./general/CreditsBar.vue";
</script>

<style scoped>
.chatbot__sidebar {
  flex: 0 0 23.75rem;
  height: 100vh;
  max-height: 100vh;

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
  gap: 1.5rem;
}

.chatbot__sidebar .sidebar__top {
  gap: 2rem;
  flex: 1 1 100%;
  height: calc(100% - 8.625rem);
}

.chatbot__sidebar .sidebar__bottom {
  flex: 0 0 auto;
  gap: 1.5rem;
}
</style>
