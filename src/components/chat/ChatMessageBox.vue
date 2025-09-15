<template>
  <div :class="classes">
    <div class="box__top flex justify--between align--center">
      <p class="body-14 body--reg">{{ name }}</p>
      <div class="box__actions message__actions flex align--center">
        <slot name="box-actions"> </slot>
      </div>
    </div>
    <div class="box__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
  type: {
    type: String,
    default: "text",
  },
  class: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  let classes = `message__box message__box--${props.type} flex flex--column ${props.class}`;

  return classes;
});
</script>
