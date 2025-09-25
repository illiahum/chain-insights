<template>
  <div :class="popupClass" v-show="!is_hide">
    <div class="popup__body">
      <div class="popup__top">
        <div @click="$emit('changePopup')" v-if="show_back" class="popup__back">
          <IconArrowLeft class="icon icon--16" />
        </div>

        <div class="popup__title">
          <slot name="head"></slot>
        </div>

        <div @click="$emit('closePopup')" class="popup__close">
          <IconX class="icon icon--16" />
        </div>
      </div>
      <div class="popup__content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { IconArrowLeft, IconX } from "@tabler/icons-vue";
import { computed } from "vue";

const props = defineProps({
  is_hide: Boolean,
  show_back: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
});

const popupClass = computed(() => {
  let classStr = `popup ${props.class}`;

  if (props.size != "") {
    classStr += ` popup--${props.size}`;
  }

  return classStr;
});

defineEmits(["closePopup", "changePopup"]);
</script>
