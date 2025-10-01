<template>
  <div
    class="chat__start-screen flex flex--column align--center justify--start"
  >
    <div class="start__title-inner">
      <p class="start__title heading heading-1">
        <span>Ask Your Question and Explore</span> Blockchain Insights
      </p>
    </div>

    <TabsComponent :tabs="mainTabs">
      <TabsComponent
        :tabs="nestedTabs"
        variant="variant-2"
        orientation="horizontal"
      >
        <div class="start__options flex flex--column">
          <ChatOption
            text="Show me all TAO transfers from wallet [address] in the last 30 days"
          />
          <ChatOption
            text="Find all incoming alpha token transactions to [address]"
          />
          <ChatOption
            text="Trace money flow between two specific Bittensor addresses"
          />
          <ChatOption
            text="Show the transaction path from [source] to [destination] for TAO transfers"
          />
          <ChatOption
            text="Find all outgoing transfers from [address] filtered by alpha tokens"
          />
        </div>
      </TabsComponent>
    </TabsComponent>

    <MessageInput />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TabsComponent from "../general/tabs/TabsComponent.vue";
import ChatOption from "./ChatOption.vue";
import MessageInput from "../general/MessageInput.vue";

const mainTabs = ref([
  "Money Flow Analysis",
  "Shortest Path Analysis",
  "Similarity Search",
  "Balance Transfers Analysis",
  "Balance Series Analysis",
  "Cross-Category Advanced Queries",
]);

const nestedTabs = ref([
  "Basic Flow Tracking",
  "Basic Flow Tracking",
  "Basic Flow Tracking",
]);
</script>

<style scoped>
.chat__start-screen {
  position: relative;
  height: 100%;
  background-image: url("@/assets/img/bg-pattern.png");
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 5rem 9.375rem 0px;
}

@media screen and (min-width: 1921px) {
  .chat__start-screen {
    padding: 5rem 12.5rem 0px;
  }
}

.chat__start-screen .start__title-inner {
  padding-top: 7.8125rem;
  background-image: url("@/assets/img/bg-start-title.png");
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 15.0625rem 8.8125rem;
  margin-bottom: 3.6875rem;
}

.chat__start-screen .start__title {
  color: rgba(255, 255, 255, 0.57);
  width: 50.3125rem;
  text-align: center;
}

.chat__start-screen .tabs {
  width: 100%;
}

.chat__start-screen .start__options {
  gap: 0.5rem;
}

.chat__start-screen .start__options .chat-option {
  width: 100%;
  height: 4.1875rem;
}

.chat__start-screen .chatbot__message-input {
  right: 9.375rem;
  left: 9.375rem;
}

@media screen and (min-width: 1921px) {
  .chat__start-screen .chatbot__message-input {
    right: 12.5rem;
    left: 12.5rem;
  }
}

@media screen and (max-width: 767px) {
  .chat__start-screen {
    position: relative;
    height: 100%;
    background-image: url("@/assets/img/bg-pattern.png");
    background-position: top left;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0px 1rem;
  }

  .chatbot__content .chat__start-screen {
    padding-top: 17.875rem;
  }

  .chat__start-screen .start__title-inner {
    padding-top: 4rem;
    background-image: url("@/assets/img/bg-start-title.png");
    background-size: 8.5rem 5rem;
    margin-bottom: 6rem;
  }

  .chat__start-screen .start__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .chat__start-screen .start__options {
    gap: 0.5rem;
  }

  .chat__start-screen .start__options .chat-option {
    width: 100%;
    height: auto;
    text-align: left;
  }

  .chat__start-screen .chatbot__message-input {
    left: 0rem;
    width: 100vw;
  }
}
</style>
