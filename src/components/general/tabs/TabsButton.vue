<template>
  <div :class="buttonClasses">
    <span class="body-16 body-14--mobile body--reg">{{ text }}</span>
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
  isActive: {
    type: Boolean,
    default: false,
  },
});

const buttonClasses = computed(() => {
  let classes = `${props.class} tabs__button`;

  if (props.isActive) {
    classes += " tabs__button--active";
  }

  return classes;
});
</script>
