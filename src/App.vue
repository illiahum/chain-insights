<template>
  <RouterView />

  <div class="toasts" :class="{ 'toasts--open': messages.length > 0 }">
    <ToastElement
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :index="index"
      :visibility="visibility"
    />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useToast } from "./composables/useToast.js";
import ToastElement from "./components/general/ToastElement.vue";

const { messages, visibility } = useToast();
</script>
