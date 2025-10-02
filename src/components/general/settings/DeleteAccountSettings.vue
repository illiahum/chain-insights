<template>
  <ModalComponent
    :is_hide="is_hide"
    :show_back="true"
    @close-popup="$emit('closePopup')"
    @change-popup="$emit('changePopup')"
    size="small"
    class="popup-delete-account"
  >
    <template #head> Delete account </template>

    <template #content>
      <div class="popup__row settings__group">
        <div class="popup__icon">
          <IconTrash class="icon icon--24 icon--red" />
        </div>
      </div>
      <div class="popup__row">
        <p class="body-18 body-16--mobile body--semi">
          Are you sure you want to delete your account?
        </p>
      </div>
      <div class="popup__row">
        <p class="body-16 body-14--mobile body--reg color--white-600">
          This action is permanent. <br />
          Once your account is deleted, all your data, settings, and information
          will be removed and cannot be recovered.
        </p>
      </div>
      <div class="popup__row settings__group">
        <div class="group__content flex flex--column gap--24">
          <p class="body-16 body-14--mobile body--reg color--white-600">
            Before proceeding, please answer the following question to confirm
            your request:
          </p>
          <div class="flex flex--column gap--12">
            <p class="body-16 body-14--mobile body--semi">
              What is {{ num1 }} {{ operator }} {{ num2 }}?
            </p>
            <BaseInput
              v-model="userAnswer"
              type="text"
              placeholder="Enter the answer here"
            />
          </div>
          <div class="flex align--center gap--6">
            <IconInfoCircle class="icon icon--16 icon--white--600" />
            <span class="body-12 body--reg color--white-600"
              >This is to make sure that the account deletion is
              intentional.</span
            >
          </div>
        </div>
      </div>
      <div class="popup__row popup__buttons flex gap--16">
        <BaseButton
          text="Cancel"
          type="secondary"
          @click="() => $emit('changePopup', 'settings')"
        />
        <BaseButton
          text="Delete Account"
          type="secondary"
          :disabled="answer != userAnswer"
          class="color--red"
          @click="() => $emit('changePopup', 'settings')"
        />
      </div>
    </template>
  </ModalComponent>
</template>

<script setup>
import { IconTrash, IconInfoCircle } from "@tabler/icons-vue";
import ModalComponent from "../../modals/ModalComponent.vue";

import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  is_hide: Boolean,
});

defineEmits(["closePopup", "changePopup"]);

const num1 = ref(0);
const num2 = ref(0);
const operator = ref("+");
const userAnswer = ref("");
const answer = computed(() => {
  switch (operator.value) {
    case "+":
      return num1.value + num2.value;
    case "-":
      return num1.value - num2.value;
    case "*":
      return num1.value * num2.value;
  }
});

function generateExample() {
  const operators = ["+", "-", "*"];
  operator.value = operators[Math.floor(Math.random() * operators.length)];
  num1.value = Math.floor(Math.random() * 10) + 1;
  num2.value = Math.floor(Math.random() * 10) + 1;
}

onMounted(() => {
  generateExample();
});
</script>

<style scoped>
.popup-delete-account .popup__icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(235, 79, 79, 0.1);
}

.popup-delete-account .popup__buttons .button {
  flex: 1 1 50%;
}

.popup-delete-account .popup__buttons .button.color--red:deep(.text) {
  color: var(--red-error, rgba(235, 79, 79, 1));
}
</style>
