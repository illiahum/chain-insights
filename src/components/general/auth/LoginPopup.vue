<template>
  <ModalComponent
    :is_hide="is_hide"
    @close-popup="$emit('closePopup')"
    size="small"
    class="popup-auth"
  >
    <template #head> Log in </template>

    <template #content>
      <div class="popup__rows">
        <div class="popup__row mb--16">
          <BaseInput
            v-model="email"
            type="email"
            placeholder="Your email"
            label="Email"
          />
        </div>
        <div class="popup__row">
          <BaseInput
            v-model="password"
            type="password"
            placeholder="Your password"
            label="Password"
          >
            <template #label-action>
              <BaseButton
                type="ghost"
                text="Forgot password?"
                size="m"
                class="body-12"
                @click="$emit('changePopup', 'reset-password')"
              />
            </template>
          </BaseInput>
        </div>
      </div>
      <div class="popup__row">
        <BaseButton
          size="l"
          :full-width="true"
          text="Log in"
          @click="loginClick"
        />
      </div>
      <div class="popup__row popup__row-seperator">
        <div class="body-14 body--reg color--white-700">or</div>
      </div>
      <div class="popup__row">
        <BaseButton
          type="secondary"
          size="l"
          :full-width="true"
          text="Log in with Google"
          class="button--google"
          :icon="GoogleIcon"
        />
      </div>
      <div class="popup__row flex align--center justify--center gap--8">
        <div class="body-14 body--reg color--white-600">
          Do not have an account?
        </div>
        <BaseButton
          type="ghost"
          text="Sign up"
          size="m"
          @click="$emit('changePopup', 'signup')"
        />
      </div>
    </template>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from "../../modals/ModalComponent.vue";

import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";

import { ref } from "vue";
import GoogleIcon from "../../icons/GoogleIcon.vue";
import { useUserStore } from "../../../stores/user";

const user = useUserStore();

const props = defineProps({
  is_hide: Boolean,
});

const email = ref("");
const password = ref("");

const emit = defineEmits(["closePopup"]);

const loginClick = () => {
  user.setUser({
    id: "050449040404",
    name: "Illia",
    email: "johndoe@gmail.com",
  });

  emit("closePopup");
};
</script>
