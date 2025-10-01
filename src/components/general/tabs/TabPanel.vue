<template>
  <div v-show="panel.isActive" class="tab-panel">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const panel = ref({
  title: props.title,
  isActive: false,
});

const addTab = inject("addTab");
const selectTab = inject("selectTab");

onMounted(() => {
  addTab(panel.value);
});
</script>
