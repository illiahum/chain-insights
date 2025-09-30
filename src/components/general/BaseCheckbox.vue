<template>
  <div :class="inputClasses">
    <label class="body-14 body--reg">
      <span v-if="icon && iconPosition === 'left'">
        <component :is="icon" :class="`icon icon--${iconSize}`" />
      </span>
      <input type="checkbox" v-model="model" :value="value" />
      <span v-if="!hideLabel">{{ label }}</span>
      <span v-if="icon && iconPosition === 'right'">
        <component :is="icon" :class="`icon icon--${iconSize}`" />
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const model = defineModel();

const props = defineProps({
  value: String,
  label: {
    type: String,
    default: "",
  },
  hideLabel: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Object,
    default: null,
  },
  iconSize: { type: [String, Number], default: "20" },
  iconPosition: {
    type: String,
    default: "left",
  },
  class: {
    type: String,
    default: "",
  },
});
const inputType = ref(props.type);

const inputClasses = computed(() => {
  let classes = `${props.class} field field--checkbox`;

  return classes;
});
</script>
