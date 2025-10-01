<template>
  <div :class="inputClasses">
    <div
      class="field__select flex align--center justify--between"
      @click="toggleDropdown"
    >
      <div class="field__select-value flex align--center gap--8">
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
          ><span v-if="!hideLabel">{{ label }}</span></span
        >
      </div>

      <span class="body-12 body--reg color--white-500">{{
        selected.label
      }}</span>
    </div>

    <Teleport to="body">
      <ModalComponent
        :is_hide="!isOpen"
        @close-popup="() => (isOpen = !isOpen)"
        @changePopup="() => (isOpen = !isOpen)"
        :show_back="true"
      >
        <template #head> {{ label }} </template>

        <template #content>
          <div
            class="field-select__options--2 flex flex--column gap--16"
            v-show="isOpen"
          >
            <div
              v-for="option in options"
              :key="option.value"
              @click.stop="selectOption(option)"
              class="select__option body-14 body--reg"
              :class="{
                'select__option--selected': option.value == selected?.value,
              }"
            >
              <div class="option__text flex flex--column">
                <span class="body-14 body--reg">{{ option.label }}</span
                ><span
                  class="body-12 body--reg color--white-500 mt--8"
                  v-if="option?.text"
                  >{{ option.text }}</span
                >
              </div>
              <IconCircleCheckFilled
                class="icon icon--16 icon--gold--filled"
                v-show="option.value == selected?.value"
              />
            </div>
            <BaseButton
              text="Apply"
              :full-width="true"
              type="secondary"
              @click="isOpen = false"
            />
          </div>
        </template>
      </ModalComponent>
    </Teleport>
  </div>
</template>

<script setup>
import {
  IconChevronDown,
  IconCircleCheckFilled,
  IconX,
} from "@tabler/icons-vue";

import ModalComponent from "../modals/ModalComponent.vue";
import BaseButton from "./BaseButton.vue";

import { ref, computed, watch, Teleport } from "vue";

const props = defineProps({
  modelValue: { type: [String, Number], default: null },
  placeholder: { type: String, default: "" },
  label: { type: String, default: "" },
  hideLabel: { type: Boolean, default: false },
  icon: { type: Object, default: null },
  iconSize: { type: [String, Number], default: "20" },
  class: { type: String, default: "" },
  options: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selected = ref(
  props.options.find((item) => item.value == props.modelValue)
);

const inputClasses = computed(() => `${props.class} field field--select--2`);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  selected.value = option;
  emit("update:modelValue", option.value);
}

watch(
  () => props.modelValue,
  (val) => {
    selected.value = props.options.find((item) => item.value == val);
  }
);
</script>
