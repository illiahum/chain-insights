<template>
  <div class="form-page">
    <div
      class="form-reset--success flex flex--column"
      v-if="isSubmitted && isValid"
    >
      <div class="success__icon flex align--center justify--center">
        <IconCheck class="icon icon--24" />
      </div>
      <p class="body-18 body--semi">Password Successfully Changed</p>
      <p class="body-16 body--reg color--white-600">
        Your new password has been applied.<br />You can now log in to your
        account using the new password.
      </p>
      <BaseButton
        size="l"
        :full-width="true"
        text="Log in"
        type="secondary"
        @click="router.push('/')"
      />
    </div>
    <div class="form-reset-password" v-else>
      <div class="form">
        <div class="form__head flex align--center">
          <p class="body-16 body--reg">Set new password</p>
        </div>
        <div class="form__content flex flex--column">
          <div class="form__row">
            <BaseInput
              v-model="password"
              type="password"
              placeholder="New password"
              label="Set new password"
            />
          </div>
          <div class="form__row">
            <BaseInput
              v-model="repeatPassword"
              type="password"
              placeholder="Repeat new password"
              label="Repeat new password"
              :error="
                isSubmitted && isNotMatchingPasswords
                  ? 'The passwords do not match'
                  : ''
              "
            />
          </div>
          <div class="form__row">
            <BaseButton
              size="l"
              :full-width="true"
              text="Set new password"
              type="secondary"
              @click="changePassword"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "../general/BaseButton.vue";
import BaseInput from "../general/BaseInput.vue";
import { IconCheck } from "@tabler/icons-vue";

import { useRouter } from "vue-router";

const password = ref("");
const repeatPassword = ref("");

const router = useRouter();

const isNotMatchingPasswords = ref(false);
const isSubmitted = ref(false);
const isValid = ref(false);

const changePassword = () => {
  isSubmitted.value = true;
  isNotMatchingPasswords.value = password.value != repeatPassword.value;
  isValid.value = password.value == repeatPassword.value;
};
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-page .form-reset--success .success__icon {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background: rgba(79, 235, 105, 0.1);
}

.form-page .form-reset--success .success__icon svg {
  stroke: rgba(79, 235, 105, 1);
}

.form-page .form-reset--success {
  gap: 1rem;
  width: 26.75rem;
  padding: 0px 0.5rem;
}

.form-reset-password .form {
  width: 28.75rem;

  border-radius: 1.25rem;
  border: 1px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: var(--sidebar-color, #131318);
}

.form-reset-password .form .form__head {
  width: 100%;
  min-height: 4rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--white-100, rgba(255, 255, 255, 0.1));
}

.form-reset-password .form .form__content {
  padding: 1rem;
  gap: 1.5rem;
}
</style>
