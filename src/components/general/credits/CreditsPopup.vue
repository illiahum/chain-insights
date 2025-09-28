<template>
  <div v-show="!is_hide">
    <ModalComponent
      :is_hide="currentTab != 'credits'"
      @close-popup="closePopup"
      size="small"
      class="popup-credits"
    >
      <template #head> Credits </template>

      <template #content>
        <div class="popup__row popup__row--balance popup__group">
          <div class="group__row flex align--center justify--between mb--24">
            <p class="body-14 body--reg">Your Current Credit Balance</p>
            <p class="body-14 body--reg">56/300 credits</p>
          </div>
          <div class="group__row">
            <CreditBarLine credits="56" max="300" class="mb--16" />
            <div>
              <p class="body-12 body--reg color--white-600 mb--10">
                Each request costs a certain number of credits based on its
                complexity, ranging from 1 to 15 credits.
              </p>
              <button
                @click="() => (currentTab = 'about-credits')"
                class="body-12 body--reg color--gold link"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
        <div class="popup__row popup__row--balance">
          <p class="body-12 body--reg mb--8 color--white-600">Top up balance</p>
          <div class="popup__group">
            <div class="group__row group__field-add-balance">
              <div class="field-add-balance">
                <input
                  v-model="addBalanceCount"
                  placeholder="How many credits do you need?"
                />
                <BaseSelect :options="currencyOptions" v-model="currency" />
              </div>
              <div class="field__default-values flex">
                <div
                  class="field__default-value body-12 body--reg"
                  v-for="value in defaultValues"
                  :key="value"
                  @click="() => (addBalanceCount = value)"
                >
                  {{ value }}
                </div>
              </div>
            </div>

            <BaseButton
              :text="
                addBalanceCount > 0
                  ? `Buy ${addBalanceCount} Credits for <b>10 USDC</b>`
                  : 'Buy Credits'
              "
              size="l"
              :type="addBalanceCount > 0 ? 'primary' : 'secondary'"
              :full-width="true"
              @click="
                currentTab =
                  addBalanceCount > 10 ? 'credits-success' : 'credits-error'
              "
              class="mt--24"
            />
          </div>
        </div>
      </template>
    </ModalComponent>
    <AboutCreditsPopup
      :is_hide="currentTab != 'about-credits'"
      @change-popup="changePopup"
      @close-popup="closePopup"
    />
    <SuccessCreditsPopup
      v-if="currentTab == 'credits-success'"
      :is_hide="false"
      @close-popup="closePopup"
    />
    <ErrorCreditsPopup
      :is_hide="currentTab != 'credits-error'"
      @change-popup="changePopup"
      @close-popup="closePopup"
    />
  </div>
</template>

<script setup>
import ModalComponent from "../../modals/ModalComponent.vue";
import AboutCreditsPopup from "./AboutCreditsPopup.vue";
import SuccessCreditsPopup from "./SuccessCreditsPopup.vue";
import ErrorCreditsPopup from "./ErrorCreditsPopup.vue";

import BaseInput from "../BaseInput.vue";
import BaseSelect from "../BaseSelect.vue";
import BaseButton from "../BaseButton.vue";

import { ref } from "vue";
import CreditBarLine from "../CreditBarLine.vue";
import UsdcIcon from "../../icons/Currencies/UsdcIcon.vue";
import UsdtIcon from "../../icons/Currencies/UsdtIcon.vue";

const currentTab = ref("credits");
const addBalanceCount = ref(null);

const defaultValues = [10, 25, 50, 100, 200, 300];

const currency = ref("USDC");
const currencyOptions = [
  {
    label: "USDC",
    value: "USDC",
    icon: UsdcIcon,
  },
  {
    label: "USDT",
    value: "USDT",
    icon: UsdtIcon,
  },
];

const props = defineProps({
  is_hide: Boolean,
});

const emit = defineEmits(["closePopup"]);

const closePopup = () => {
  emit("closePopup");
  currentTab.value = "credits";
};

const changePopup = (tab = "credits") => {
  currentTab.value = tab;
};
</script>

<style scoped>
.popup__row--balance .group__field-add-balance .field-add-balance {
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 1.25rem;
  border-radius: 0.75rem;
  border: 0.5px solid var(--White-White-100, rgba(255, 255, 255, 0.1));
  background: linear-gradient(
      172deg,
      rgba(255, 255, 255, 0) -30.31%,
      rgba(255, 255, 255, 0.04) 124.3%
    ),
    rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(1rem);
  height: 3rem;
}
.popup__row--balance .group__field-add-balance .field-add-balance input {
  flex: 1 1 auto;
  background-color: transparent;
  border: none;
}
.popup__row--balance
  .group__field-add-balance
  .field-add-balance:deep(.field__select) {
  padding: 0;
  padding-right: 1.25rem;
  background: transparent;
  height: 100%;
  backdrop-filter: none;
  border: none;
}

.popup__row--balance .group__field-add-balance .field__default-values {
  gap: 0.5rem;
  margin-top: 0.625rem;
}
.popup__row--balance
  .group__field-add-balance
  .field__default-values
  .field__default-value {
  width: 3rem;
  text-align: center;
  padding: 0.5rem 0px;
  border-radius: 0.625rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(11.5px);
  color: var(--white-600, rgba(255, 255, 255, 0.6));
  cursor: pointer;
}
</style>
