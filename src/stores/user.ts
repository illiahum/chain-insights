import { defineStore } from "pinia";
import type { User } from "../interfaces/UserInterface";

export const useUserStore = defineStore("user", {
  state: () => ({
   currentUser: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(user: User) {
      this.currentUser = user
      this.isAuthenticated = true
    },
    logout() {
      this.currentUser = null
      this.isAuthenticated = false
    },
  },
});
