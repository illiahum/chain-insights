<template>
  <ChatMessageBox :name="name" type="table">
    <template #box-actions>
      <div class="box__action message__action">
        <IconCopy />
      </div>
      <div class="box__action message__action">
        <IconDownload />
      </div>
    </template>

    <template #content
      ><table class="body-14 body--reg">
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
    </template>
  </ChatMessageBox>
</template>

<script setup>
import { computed } from "vue";
import { useChatsStore } from "../../stores/chats";
import { IconCopy, IconDownload } from "@tabler/icons-vue";
import ChatMessageBox from "./ChatMessageBox.vue";

const chatsStore = useChatsStore();
const props = defineProps({
  name: String,
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
