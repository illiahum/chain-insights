<template>
  <div :class="inputClasses" @click="$emit('click')">
    <div class="field__label flex align--center justify--between">
      <label v-if="label != ''" class="body-16 body--reg">{{ label }}</label>

      <slot name="label-action"> </slot>
    </div>
    <div class="field__input">
      <span v-if="icon && iconPosition === 'left'" class="icon">
        <slot name="icon">
          <component :is="icon" class="icon icon--20" />
        </slot>
      </span>
      <input
        :type="inputType"
        :placeholder="placeholder"
        class="body-14 body--reg"
        :readonly="readonly"
        v-model="model"
      />
      <span
        v-if="type == 'password'"
        @click="() => (inputType = inputType == 'text' ? 'password' : 'text')"
      >
        <IconEye
          class="icon icon--20 icon--white--600"
          v-if="inputType == 'password'"
        />
        <IconEyeClosed class="icon icon--20 icon--white--600" v-else />
      </span>
      <span
        v-if="icon && iconPosition === 'right' && type != 'password'"
        class="icon__show-password"
      >
        <component :is="icon" class="icon icon--20" />
      </span>
    </div>
    <div class="field__hint body-12 body--reg flex align--center" v-if="hint">
      <slot name="hint"></slot>
    </div>
    <div class="field__error body-14 body--reg color--red mt--8" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { IconEye, IconEyeClosed } from "@tabler/icons-vue";
import { computed, ref } from "vue";

const model = defineModel();

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  icon: {
    type: Object,
    default: null,
  },
  iconPosition: {
    type: String,
    default: "left",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
});
const inputType = ref(props.type);

const inputClasses = computed(() => {
  let classes = `${props.class} field field--${props.type}`;

  if (props.error != "") {
    classes += ` field--error`;
  }

  return classes;
});
</script>
