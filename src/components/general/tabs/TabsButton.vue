<template>
  <div :class="buttonClasses">
    <span class="body-16 body--reg">{{ text }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: String,
  class: {
    type: String,
    default: "",
  },
});

const buttonClasses = computed(() => {
  let classes = `${props.class} tabs__button`;

  return classes;
});
</script>
