<template>
  <button :class="buttonClasses" @click="openUrl">
    <span v-if="icon && iconPosition === 'left'" class="icon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
    <span class="text">{{ text }}</span>
    <span v-if="icon && iconPosition === 'right'" class="icon">
      <slot name="icon">
        <component :is="icon" />
      </slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: String,
  icon: {
    type: Object,
    default: null,
  },
  iconPosition: {
    type: String,
    default: "left",
  },
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "l",
  },
  url: {
    type: String,
    default: "",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
});

const buttonClasses = computed(() => {
  let classes = `${props.class} button button--${props.type} button--${props.size}`;

  if (props.fullWidth) {
    classes += ` button--full`;
  }

  return classes;
});

function openUrl() {
  if (props.url != "") {
    window.location.href = props.url;
  }
}
</script>
