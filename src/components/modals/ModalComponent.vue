<template>
  <div class="popup" v-show="!is_hide">
    <div class="popup__body">
      <div class="popup__top">
        <slot name="head"></slot>

        <div @click="$emit('closePopup')">
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
import { IconX } from "@tabler/icons-vue";

const props = defineProps({
  is_hide: Boolean,
});

defineEmits(["closePopup"]);
</script>
