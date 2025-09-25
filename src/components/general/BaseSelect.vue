<template>
  <div :class="inputClasses">
    <label v-if="label !== ''" class="body-16 body--reg">{{ label }}</label>
    <div class="field__input field__select" @click="toggleDropdown">
      <span v-if="icon">
        <slot name="icon">
          <component :is="icon" class="icon icon--20" />
        </slot>
      </span>

      <span class="body-14 body--reg select__current-value">{{
        selectedLabel
      }}</span>

      <span><IconChevronDown class="icon icon--20" /></span>

      <ul v-show="isOpen" class="select__options">
        <li
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option)"
          class="body-14 body--reg"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>

    <div class="field__hint body-12 body--reg flex align--center" v-if="hint">
      <slot name="hint"></slot>
    </div>
  </div>
</template>

<script setup>
import { IconChevronDown } from "@tabler/icons-vue";
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  placeholder: { type: String, default: "" },
  label: { type: String, default: "" },
  icon: { type: Object, default: null },
  hint: { type: Boolean, default: false },
  class: { type: String, default: "" },
  options: { type: Array, default: () => [] }, // [{ label: 'Option 1', value: 1 }]
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selected = ref(props.modelValue);

const inputClasses = computed(() => `${props.class} field field--select`);

const selectedLabel = computed(() => {
  const option = props.options.find((o) => o.value === selected.value);
  return option ? option.label : "";
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  selected.value = option.value;
  emit("update:modelValue", option.value);
  isOpen.value = false;
}

watch(
  () => props.modelValue,
  (val) => {
    selected.value = val;
  }
);
</script>
