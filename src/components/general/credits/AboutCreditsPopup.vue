<template>
  <ModalComponent
    :is_hide="is_hide"
    :show_back="true"
    @close-popup="$emit('closePopup')"
    @change-popup="$emit('changePopup')"
    size="small"
    class="popup-about-credits"
  >
    <template #head> About Credits </template>

    <template #content>
      <div class="popup__row">
        <p class="body-18 body--semi mb--16">About Credits</p>
        <p class="body-16 body--reg color--white-600">
          Each request you make will consume a certain number of credits based
          on its complexity. The more complex the request, the more credits will
          be deducted. Here’s an approximate breakdown of how many credits are
          required for different types of requests:
        </p>
      </div>
      <div class="popup__row popup__group">
        <div class="group__top flex align--center justify--start">
          <IconTextCaption class="icon icon--16 icon--gold" />
          <p class="body-16 body--semi">Text Query</p>
        </div>
        <div class="group__content body-16 body--reg color--white-600">
          <ul>
            <li>Example: "Show me the balance of address X"</li>
            <li>Credits required: 1 Credit</li>
            <li>
              Description: Simple text-based queries that return basic
              information.
            </li>
          </ul>
        </div>
      </div>
      <div class="popup__row popup__group">
        <div class="group__top flex align--center justify--start">
          <IconAnalyze class="icon icon--16 icon--gold" />
          <p class="body-16 body--semi">Analytics Query</p>
        </div>
        <div class="group__content body-16 body--reg color--white-600">
          <ul>
            <li>
              Example: "Show me the top holders of [Token Name] in the last 30
              days"
            </li>
            <li>Credits required: 3 Credits</li>
            <li>
              Description: More detailed queries that involve gathering data for
              analysis, such as market trends, transaction volumes, or token
              holders.
            </li>
          </ul>
        </div>
      </div>
      <div class="popup__row">
        <BaseButton
          text="Buy Credits"
          size="l"
          type="secondary"
          :full-width="true"
          @click="() => $emit('changePopup', 'credits')"
        />
      </div>
    </template>
  </ModalComponent>
</template>

<script setup>
import { IconAnalyze, IconTextCaption } from "@tabler/icons-vue";
import ModalComponent from "../../modals/ModalComponent.vue";

import BaseInput from "../BaseInput.vue";
import BaseButton from "../BaseButton.vue";
import { ref } from "vue";

const props = defineProps({
  is_hide: Boolean,
});

defineEmits(["closePopup", "changePopup"]);
</script>
