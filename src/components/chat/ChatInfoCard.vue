<template>
  <ChatMessageBox type="infocard">
    <template #head>{{ name }}</template>
    <template #actions>
      <div class="box__action message__action">
        <IconCopy />
      </div>
    </template>

    <template #content
      ><table class="body-14 body--reg">
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td>{{ row?.label }}</td>
            <th>{{ row?.text }}</th>
          </tr>
        </tbody>
      </table>
      <BaseButton
        :icon="IconArrowRight"
        type="secondary"
        text="View more"
        :fullWidth="true"
        size="m"
        iconPosition="right"
        :url="button_url"
      />
    </template>
  </ChatMessageBox>
</template>

<script setup>
import { computed } from "vue";
import { useChatsStore } from "../../stores/chats";
import { IconArrowRight, IconCopy } from "@tabler/icons-vue";
import ChatMessageBox from "./ChatMessageBox.vue";
import BaseButton from "../general/BaseButton.vue";

const chatsStore = useChatsStore();
const props = defineProps({
  name: String,
  rows: {
    type: Array,
    default: [],
  },
  button_url: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  let classes = `${props.class} message__infocard flex flex--column`;

  return classes;
});
</script>
