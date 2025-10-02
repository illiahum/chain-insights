import { ref } from "vue";

let visibility = ref(false);
let messages = ref([]);

export function useToast() {
  function resetMessages() {
    messages.value = [];
  }

  function addMessage(message) {
    if (message) {
      messages.value.push({
        id: messages.length,
        ...message,
      });
      visibility.value = true;
      setTimeout(() => {
        visibility.value = false;
        resetMessages();
      }, 3000);
    }
  }

  const removeMessage = (id) => {
    messages.value = messages.value.filter((toast) => toast.id !== id);
  };

  return {
    messages,
    removeMessage,
    addMessage,
    visibility,
  };
}
