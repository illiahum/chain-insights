<template>
  <button :class="buttonClasses">
    <component :is="icon" />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: Object,
  type: {
    type: String,
    default: "primary",
  },
  class: {
    type: String,
    default: "",
  },
});

const buttonClasses = computed(() => {
  let classes = `${props.class} button button--icon button--${props.type}`;

  return classes;
});
</script>
