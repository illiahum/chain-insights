<template>
  <div :class="inputClasses">
    <label class="switch">
      <input type="checkbox" v-model="model" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
import { computed } from "vue";

const model = defineModel();

const props = defineProps({
  class: { type: String, default: "" },
});

const inputClasses = computed(() => `${props.class} field__switcher field`);
</script>
