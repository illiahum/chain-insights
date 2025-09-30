<template>
  <div class="credits-bar-line">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
    >
      <rect width="100" height="4" rx="2" class="credits-bar__background" />

      <rect
        :width="progress"
        height="4"
        rx="2"
        class="credits-bar__pattern-background"
      />

      <rect
        :width="progress"
        height="4"
        rx="2"
        :fill="`url(#${uniqueId})`"
        fill-opacity="0.4"
      />

      <defs>
        <pattern
          :id="uniqueId"
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          patternTransform="rotate(45)"
        >
          <rect width="4" height="8" class="credits-bar__pattern" />
        </pattern>
      </defs>
    </svg>
  </div>
</template>

<script setup>
import { computed, useId } from "vue";

const props = defineProps({
  credits: { type: Number, required: true },
  max: { type: Number, required: true },
  height: {
    type: Number,
    default: 4,
  },
});

console.log("Hi");

const progress = computed(() => {
  const percent = Math.min(props.credits / props.max, 1) * 100;
  return percent;
});

const uniqueId = useId();
</script>
