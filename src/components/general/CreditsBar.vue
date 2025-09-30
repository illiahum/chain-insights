<template>
  <div :class="mainClasses">
    <div class="bar__content flex align--center">
      <div class="bar__icon" @click="() => (isBarMenuShow = !isBarMenuShow)">
        <AtomIcon />
      </div>
      <div class="bar__data flex flex--column justify--between">
        <p class="body-14 body--reg">5/300 credits</p>
        <CreditBarLine :credits="56" :max="300" />
      </div>
    </div>
    <BaseButton
      text="Buy credits"
      size="m"
      @click="() => (isCreditsShow = !isCreditsShow)"
    />
    <div class="bar__menu flex flex--column" v-show="isBarMenuShow">
      <div
        class="menu__item flex align--center body-14 body--reg"
        @click="() => (isSettingsShow = !isSettingsShow)"
      >
        <IconSettings class="icon icon--16" />
        Settings
      </div>
      <div
        class="menu__item flex align--center body-14 body--reg"
        @click="() => (isCreditsShow = !isCreditsShow)"
      >
        <IconTopologyStar2 class="icon icon--16" />
        Buy credits
      </div>
      <div class="menu__item-seperator"></div>
      <div
        class="menu__item menu__item--logout flex align--center body-14 body--reg"
      >
        <IconLogout class="icon icon--16" />
        Log out
      </div>
    </div>
  </div>

  <Teleport to="body">
    <SettingsPopup :is_hide="!isSettingsShow" @closePopup="closeSettingPopup" />
    <CreditsPopup :is_hide="!isCreditsShow" @closePopup="closeCreditsPopup" />
  </Teleport>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseButton from "./BaseButton.vue";
import AtomIcon from "../icons/AtomIcon.vue";
import { IconLogout, IconSettings, IconTopologyStar2 } from "@tabler/icons-vue";
import SettingsPopup from "./settings/SettingsPopup.vue";
import CreditsPopup from "./credits/CreditsPopup.vue";
import CreditBarLine from "./CreditBarLine.vue";

const props = defineProps({
  class: String,
});

const isBarMenuShow = ref(false);
const isSettingsShow = ref(false);
const isCreditsShow = ref(false);

const closeSettingPopup = () => {
  isSettingsShow.value = !isSettingsShow.value;
};

const closeCreditsPopup = () => {
  isCreditsShow.value = !isCreditsShow.value;
};

const mainClasses = computed(() => {
  return `credits-bar flex ${props.class}`;
});
</script>

<style scoped>
.credits-bar {
  gap: 1.5rem;
  position: relative;
}

.credits-bar .bar__content {
  flex: 1 1 auto;
  gap: 0.5rem;
}

.credits-bar .bar__menu {
  position: absolute;
  bottom: calc(100% + 1.5rem);
  left: 0px;
  right: 0px;
  border-radius: 1.25rem;
  border: 1px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: linear-gradient(
      172deg,
      rgba(71, 120, 234, 0) -30.31%,
      rgba(71, 120, 234, 0.04) 124.3%
    ),
    rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(1.125rem);
  padding: 1rem;
  gap: 0.5rem;
}

.credits-bar .bar__menu .menu__item {
  min-height: 2rem;
  padding: 0 0.5rem;
  gap: 0.5rem;
  transition: all 0.3s linear;
  cursor: pointer;
  border-radius: 0.5rem;
}

.credits-bar .bar__menu .menu__item:hover,
.credits-bar .bar__menu .menu__item:focus {
  background: var(--gold-100, rgba(242, 221, 166, 0.1));
}

.credits-bar .bar__menu .menu__item.menu__item--logout {
  color: var(--red-error, #eb4f4f);
}

.credits-bar .bar__menu .menu__item svg {
  stroke: var(--gold-1000);
}

.credits-bar .bar__menu .menu__item.menu__item--logout svg {
  stroke: var(--red-error, #eb4f4f);
}

.credits-bar .bar__menu .menu__item-seperator {
  height: 1px;
  border-radius: 0.5rem;
  background: var(--white-50, rgba(255, 255, 255, 0.05));
}

.credits-bar .bar__icon {
  padding: 0.46875rem;
  border-radius: 100%;
  border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: var(--sidebar, #131318);
  cursor: pointer;
}

.credits-bar .bar__icon svg {
  width: 1.5625rem;
  height: 1.5625rem;
  display: block;
}

.credits-bar .bar__data {
  flex: 1 1 auto;
  height: 2rem;
}

.credits-bar .bar__data .credits-bar-line {
  height: 0.25rem;
}

.credits-bar .bar__data .credits-bar-line:deep(svg) {
  width: 100%;
  height: 0.25rem;
  position: relative;
  border-radius: 6px;
}
</style>
