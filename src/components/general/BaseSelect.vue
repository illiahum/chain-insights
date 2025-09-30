<template>
  <div :class="inputClasses" ref="trigger">
    <label v-if="label !== ''" class="body-16 body--reg">{{ label }}</label>
    <div class="field__input field__select" @click="toggleDropdown">
      <span v-if="icon">
        <slot name="icon">
          <component :is="icon" :class="`icon icon--${iconSize}`" />
        </slot>
      </span>

      <span class="body-14 body--reg select__current-value" v-if="selected">
        <component
          v-if="selected?.icon"
          :is="selected.icon"
          iconClass="icon icon--16"
        ></component
        ><span v-if="!hideLabel">{{ selected.label }}</span></span
      >
      <span class="body-14 body--reg select__current-value" v-else
        ><span v-if="!hideLabel">{{ defaultName }}</span></span
      >

      <span><IconChevronDown :class="`icon icon--${iconSize}`" /></span>
    </div>

    <Teleport to="body">
      <div class="field-select__options" ref="dropdown" v-show="isOpen">
        <div
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option)"
          class="select__option body-14 body--reg"
        >
          <component
            v-if="'icon' in option"
            :is="option?.icon"
            iconClass="icon icon--16"
          ></component>
          <span>{{ option.label }}</span>
          <IconCircleCheckFilled
            class="icon icon--16 icon--gold--filled"
            v-show="option.value == selected?.value"
          />
        </div>
      </div>
    </Teleport>

    <div class="field__hint body-12 body--reg flex align--center" v-if="hint">
      <slot name="hint"></slot>
    </div>
  </div>
</template>

<script setup>
import { IconChevronDown, IconCircleCheckFilled } from "@tabler/icons-vue";

import {
  ref,
  computed,
  watch,
  onMounted,
  nextTick,
  onUnmounted,
  Teleport,
} from "vue";

const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  placeholder: { type: String, default: "" },
  label: { type: String, default: "" },
  hideLabel: { type: Boolean, default: false },
  defaultName: { type: String, default: "" },
  icon: { type: Object, default: null },
  iconSize: { type: [String, Number], default: "20" },
  hint: { type: Boolean, default: false },
  class: { type: String, default: "" },
  options: { type: Array, default: () => [] }, // [{ label: 'Option 1', value: 1, icon }]
  optionsPosition: { type: String, default: "bottom" },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selected = ref(
  props.options.find((item) => item.value == props.modelValue)
);

const trigger = ref(null);
const dropdown = ref(null);

function updatePosition() {
  if (!trigger.value || !dropdown.value) return;

  const rect = getBoundingRect(trigger.value);
  const el = dropdown.value;

  el.style.position = "fixed";

  if (props.optionsPosition == "bottom") {
    el.style.top = rect.bottom + 4 + "px";
    el.style.right = window.innerWidth - rect.right + "px";
  }

  if (props.optionsPosition == "top") {
    el.style.top = rect.top - el.clientHeight - 8 + "px";
    el.style.right = window.innerWidth - rect.right + "px";
  }
}

onMounted(() => {
  window.addEventListener("resize", updatePosition);
  window.addEventListener("scroll", updatePosition, true);
  nextTick(updatePosition);
});

onUnmounted(() => {
  window.removeEventListener("resize", updatePosition);
  window.removeEventListener("scroll", updatePosition, true);
});

const inputClasses = computed(() => `${props.class} field field--select`);

function toggleDropdown() {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    nextTick(updatePosition);
  }
}

function selectOption(option) {
  selected.value = option;
  emit("update:modelValue", option.value);
  isOpen.value = false;
}

function getBoundingRect(element) {
  let box = element.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

watch(
  () => props.modelValue,
  (val) => {
    selected.value = props.options.find((item) => item.value == val);
  }
);
</script>
