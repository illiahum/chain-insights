<template>
  <div :class="classes">
    <div class="table__top flex justify--between align--center">
      <p class="body-14 body--reg">{{ name }}</p>
      <div class="table__actions message__actions flex align--center">
        <div class="table__action message__action">
          <IconCopy />
        </div>
        <div class="table__action message__action">
          <IconDownload />
        </div>
      </div>
    </div>
    <div class="table__content">
      <table class="body-14 body--reg">
        <thead>
          <tr>
            <td v-for="col in head">{{ col }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows">
            <td v-for="col in row">{{ col }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChatsStore } from "../../stores/chats";
import { IconCopy, IconDownload } from "@tabler/icons-vue";

const chatsStore = useChatsStore();
const props = defineProps({
  name: String,
  author: {
    type: String,
    default: "user",
  },
  head: {
    type: Array,
    default: [],
  },
  rows: {
    type: Array,
    default: [],
  },
  class: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  let classes = `${props.class} message__table flex flex--column`;

  return classes;
});
</script>
