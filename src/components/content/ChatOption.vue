<template>
  <button :class="classes">
    <span class="text body-16 body-reg">{{ text }}</span>
    <IconArrowNarrowRight />
  </button>
</template>

<script setup>
import { IconArrowNarrowRight } from "@tabler/icons-vue";
import { computed } from "vue";

const props = defineProps({
  text: String,
  class: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  let classes = `${props.class} chat-option flex align--center justify--between`;

  return classes;
});
</script>
