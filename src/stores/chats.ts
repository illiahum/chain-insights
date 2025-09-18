import { defineStore } from "pinia";
import chatMessages from "../json/messages-table.json";
import chatMessagesTable from "../json/messages.json";
import chatMessagesOptions from "../json/messages-option.json";
import chatMessagesChart from "../json/messages-chart.json";
import chatMessagesNetworkChart from "../json/messages-network-chart.json";
import type ChatInterface from "../interfaces/ChatInterface";
import type CurrentChatInterface from "../interfaces/CurrentChatInterface";
import type ChatMessageInterface from "../interfaces/ChatMessageInterface";

const fakeMessages: ChatMessageInterface[][] = [
  chatMessages as ChatMessageInterface[], 
  chatMessagesTable as ChatMessageInterface[], 
  chatMessagesChart as ChatMessageInterface[],
  chatMessagesOptions as ChatMessageInterface[],
  chatMessagesNetworkChart as ChatMessageInterface[],
]

export const useChatsStore = defineStore("chats", {
  state: () => {
    return {
      chats: [] as ChatInterface[],
      currentChat: {} as CurrentChatInterface,
    };
  },
  getters: {
    todayChats(state){
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return state.chats.filter((chat) => chat.last_activity_date >= today);
    },
    lastWeekChats(state){
      const startToday = new Date();
      startToday.setHours(0, 0, 0, 0);

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(0, 0, 0, 0);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      return state.chats.filter(chat => {
        const date = new Date(chat.last_activity_date);
        return date >= sevenDaysAgo && date < startToday;
      });
    },
    lastMonthChats(state){
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setHours(0, 0, 0, 0);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setHours(0, 0, 0, 0);
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      return state.chats.filter(chat => {
        const date = new Date(chat.last_activity_date);
        return date >= fourteenDaysAgo && date < sevenDaysAgo;
      });
    },
  },
  actions: {
    createNewChat(chat: ChatInterface){
      this.chats.push(chat);
    },

    openChat(id: string){
      const chatData = this.chats.find((chat) => chat.id == id);

      if (!chatData) return;

      const chatIndex = this.chats.findIndex((chat) => chat.id == id);

      // Have to be changed
      const chatMessages = fakeMessages[chatIndex % 5];

      this.currentChat = {
        ...chatData,
        messages: chatMessages, 
        activeChart: null
      };
    },

    selectOption(messageId: string, optionId: string){
      const messageIndex = this.currentChat.messages.findIndex((msg) => msg.id == messageId);

      if (messageIndex == -1) return;

      if (!this.currentChat.messages[messageIndex] || !this.currentChat.messages[messageIndex].options) return;

      const message = this.currentChat.messages[messageIndex];
      if (message.options == undefined) return;

      const option = message.options.findIndex((option) => option.id == optionId);
      if (option == -1 || !this.currentChat.messages[messageIndex].options[option]) return;

      this.currentChat.messages[messageIndex].options[option].is_choosen = true;
    },

    openChart(messageId: string, chart: string) {
      this.currentChat.activeChart = {
        messageId: messageId, 
        chart: chart
      }
    },

    closeChart() {
      this.currentChat.activeChart = null;
    },

    loadFakeData() {
      this.chats = [
        { id: "3430flldlv4lfrll", name: "Top 5 crypto coins", currency: "USDT", last_activity_date: new Date() },
        { id: "9ee9r9r9rjvjvj8rj", name: "TAO transfers in the last 24 hours", currency: "BTC", last_activity_date: new Date() },
        { id: "dke93kd9e3kd9ee3", name: "ETH gas fee tracker", currency: "ETH", last_activity_date: new Date("2025-09-02T19:48:00") },
        { id: "33kd9dke9ddkd993", name: "Whale BTC movements", currency: "BTC", last_activity_date: new Date("2025-09-01T07:22:00") },
        { id: "f9e9f9f9f9f9f9f9", name: "Stablecoins overview", currency: "USDC", last_activity_date: new Date("2025-08-28T22:05:00") },
        { id: "kkd9e9d9kd9kd9e9", name: "Top gainers today", currency: "SOL", last_activity_date: new Date("2025-09-10T12:00:00") },
        { id: "a1b2c3d4e5f6g7h8", name: "BTC Market Updates", currency: "BTC", last_activity_date: new Date("2025-09-09T10:12:00") },
        { id: "b2c3d4e5f6g7h8i9", name: "ETH Price Alerts", currency: "ETH", last_activity_date: new Date("2025-09-08T15:45:00") },
        { id: "f9e9f9f9f9f9f9f4", name: "Stablecoins overview", currency: "USDC", last_activity_date: new Date("2025-08-28T22:05:00") },
        { id: "kkd9e9d9kd9kd9e0", name: "Top gainers today", currency: "SOL", last_activity_date: new Date("2025-09-10T12:00:00") },
      ];
    },
  },
});
