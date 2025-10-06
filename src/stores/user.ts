import { defineStore } from "pinia";
import type { User } from "../interfaces/UserInterface";
import { useChatsStore } from "./chats";

export const useUserStore = defineStore("user", {
  state: () => ({
   currentUser: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    login(userData: User) {
      this.currentUser = userData;
      this.isAuthenticated = true;

      const chatsStore = useChatsStore();
      chatsStore.loadFakeData();
    },
    logout() {
      this.currentUser = null;
      this.isAuthenticated = false;
    }
  },
});
