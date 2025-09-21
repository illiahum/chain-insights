<template>
  <div class="message__button flex align--center">
    <component :is="icon"></component>
    <span class="body-14 body--reg" v-if="!hideLabel">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: "MessageButton",
  props: {
    name: String,
    icon: Object,
    hideLabel: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
