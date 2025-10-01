<template>
  <button
    class="sidebar__search-button flex align--center body-16 body--reg"
    @click="() => (isModalHide = false)"
  >
    <IconSearch class="icon icon--16" /> Search in History
  </button>

  <Teleport to="body">
    <ModalComponent
      :is_hide="isModalHide"
      @close-popup="() => (isModalHide = true)"
    >
      <template #head>
        <input
          placeholder="Search by your previous requests"
          v-model="searchInput"
          @input="inputEvent"
        />
      </template>
      <template #content>
        <div class="popup-search__new-chat-button">
          <BaseButton
            :icon="IconMessagePlus"
            text="New Chat"
            :full-width="true"
            type="secondary"
          />
        </div>

        <div class="popup-search__chats-list" v-if="searchInput == ''">
          <div
            class="popup-search__chats-group"
            v-if="chatsStore.todayChats.length > 0"
          >
            <p class="group__title body-14 body--reg">Today</p>
            <div class="group__list">
              <ChatButton
                v-for="chat in chatsStore.todayChats"
                :name="chat.name"
                :currency="chat.currency"
                :id="chat.id"
                :key="chat.id"
                @click="() => (isModalHide = true)"
              />
            </div>
          </div>

          <div
            class="popup-search__chats-group"
            v-if="chatsStore.twoDaysAgoChats.length > 0"
          >
            <p class="group__title body-14 body--reg">2 days ago</p>
            <div class="group__list">
              <ChatButton
                v-for="chat in chatsStore.twoDaysAgoChats"
                :name="chat.name"
                :currency="chat.currency"
                :id="chat.id"
                :key="chat.id"
              />
            </div>
          </div>

          <div
            class="popup-search__chats-group"
            v-if="chatsStore.threeDaysAgoChats.length > 0"
          >
            <p class="group__title body-14 body--reg">3 days ago</p>
            <div class="group__list">
              <ChatButton
                v-for="chat in chatsStore.threeDaysAgoChats"
                :name="chat.name"
                :currency="chat.currency"
                :id="chat.id"
                :key="chat.id"
              />
            </div>
          </div>
        </div>

        <template v-else>
          <div
            class="popup-search__placeholder flex flex--column"
            v-if="isSearching"
          >
            <div class="placeholder__group flex flex--column align--start">
              <div class="placeholder__rect--small"></div>
              <div class="placeholder__rect--medium"></div>
              <div class="placeholder__rect--large"></div>
            </div>
            <div class="placeholder__group flex flex--column align--start">
              <div class="placeholder__rect--small"></div>
              <div class="placeholder__rect--large"></div>
              <div class="placeholder__rect--medium"></div>
            </div>
            <div class="placeholder__group flex flex--column align--start">
              <div class="placeholder__rect--small"></div>
              <div class="placeholder__rect--medium"></div>
              <div class="placeholder__rect--large"></div>
            </div>
          </div>
          <div class="popup-search__results" v-else>
            <div
              v-if="results.length > 0"
              class="popup-search__results-list flex flex--column"
            >
              <div
                v-for="chat in results"
                :key="chat.id"
                class="popup-search__results-chat flex align--center"
                @click="() => buttonClick(chat.id)"
              >
                <div class="chat__name">
                  <p class="body-14 body--reg">{{ chat.name }}</p>
                  <p class="body-12 body--reg" v-html="chat.matchingString"></p>
                </div>
                <span class="chat__date body-12 body--reg">
                  {{ displayDate(chat.last_activity_date) }}
                </span>
              </div>
            </div>
            <div
              class="popup-search__results--empty flex flex--column items--center"
              v-else
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
              >
                <path
                  d="M22.5696 54.4408C22.5696 54.4408 39.1857 53.7754 42.7764 26.4621C45.9651 2.20521 73.9842 13.2461 82.0835 22.9154C92.5754 35.4413 86.9825 56.9883 100.555 59.7104C114.128 62.4324 105.265 92.6964 84.6621 89.7996C59.0335 86.1962 65.2341 101.172 57.5406 107.511C52.0191 112.06 29.3789 107.681 28.6243 91.1665C27.9893 77.2699 22.1274 77.3139 17.9725 75.7382C11.9801 73.4656 8.20427 57.007 22.5696 54.4408Z"
                  fill="white"
                  fill-opacity="0.02"
                />
                <path
                  d="M79.0548 84.7747L62.73 68.6436L59.4974 71.9149L75.8222 88.046L79.0548 84.7747Z"
                  fill="#F2DDA6"
                  fill-opacity="0.6"
                />
                <path
                  d="M85.2907 89.1087L72.59 76.5586C72.5192 76.4888 72.4053 76.4895 72.3354 76.5602L67.5283 81.425C67.4584 81.4958 67.4591 81.6097 67.5298 81.6796L80.2305 94.2296C80.3013 94.2995 80.4152 94.2988 80.4851 94.2281L85.2922 89.3632C85.3621 89.2925 85.3614 89.1786 85.2907 89.1087Z"
                  fill="#F2DDA6"
                />
                <path
                  d="M48.2613 76.756C59.4923 76.756 68.5968 67.6514 68.5968 56.4205C68.5968 45.1895 59.4923 36.085 48.2613 36.085C37.0303 36.085 27.9258 45.1895 27.9258 56.4205C27.9258 67.6514 37.0303 76.756 48.2613 76.756Z"
                  fill="#F2DDA6"
                />
                <path
                  d="M48.261 73.4376C57.6595 73.4376 65.2784 65.8186 65.2784 56.4202C65.2784 47.0218 57.6595 39.4028 48.261 39.4028C38.8626 39.4028 31.2437 47.0218 31.2437 56.4202C31.2437 65.8186 38.8626 73.4376 48.261 73.4376Z"
                  fill="#131318"
                />
                <path
                  d="M48.261 73.4376C57.6595 73.4376 65.2784 65.8186 65.2784 56.4202C65.2784 47.0218 57.6595 39.4028 48.261 39.4028C38.8626 39.4028 31.2437 47.0218 31.2437 56.4202C31.2437 65.8186 38.8626 73.4376 48.261 73.4376Z"
                  fill="#F2DDA6"
                  fill-opacity="0.3"
                />
                <path
                  d="M79.2583 37.7959C84.3434 37.4355 88.7205 40.7553 89.0366 45.2148C89.2421 48.1154 87.6772 50.7817 85.1597 52.3848C85.3608 53.8634 86.9801 55.6207 86.9858 55.627C84.5092 55.8023 83.1675 54.4009 82.5903 53.5498C81.8768 53.756 81.1437 53.8865 80.4028 53.9385C75.3178 54.2989 70.9397 50.979 70.6235 46.5195C70.3075 42.0602 74.1734 38.1563 79.2583 37.7959ZM85.436 45.3916C84.7336 45.3917 84.1646 45.9616 84.1646 46.6641C84.1646 47.3664 84.7337 47.9355 85.436 47.9355C86.1385 47.9355 86.7084 47.3665 86.7085 46.6641C86.7085 45.9616 86.1385 45.3916 85.436 45.3916ZM79.8306 44.8682C79.1323 44.8682 78.5659 45.4345 78.5659 46.1328C78.566 46.831 79.1323 47.3975 79.8306 47.3975C80.5286 47.3972 81.0942 46.8309 81.0942 46.1328C81.0942 45.4347 80.5286 44.8684 79.8306 44.8682ZM74.1704 44.3018C73.4681 44.3018 72.8982 44.871 72.8979 45.5732C72.8979 46.2757 73.4679 46.8457 74.1704 46.8457C74.8727 46.8455 75.4419 46.2756 75.4419 45.5732C75.4417 44.8711 74.8726 44.3019 74.1704 44.3018Z"
                  fill="#F2DDA6"
                  fill-opacity="0.6"
                />
                <path
                  d="M45.4487 86.0174C42.141 85.783 39.2939 87.9428 39.0883 90.8436C38.9547 92.7303 39.9722 94.4649 41.6098 95.5076C41.4786 96.4711 40.4213 97.616 40.4213 97.616C42.0324 97.7302 42.9052 96.8191 43.2807 96.2655C43.7449 96.3996 44.2225 96.4846 44.7045 96.5184C48.012 96.7526 50.8593 94.5928 51.0649 91.6922C51.2705 88.7916 48.7562 86.2519 45.4487 86.0174ZM41.4301 90.9588C41.887 90.9588 42.2572 91.3291 42.2573 91.786C42.2573 92.2429 41.8871 92.6131 41.4301 92.6131C40.9732 92.6131 40.603 92.2429 40.603 91.786C40.6031 91.3291 40.9732 90.9588 41.4301 90.9588ZM45.0766 90.618C45.5306 90.6181 45.8987 90.9863 45.8989 91.4403C45.8989 91.8944 45.5308 92.2634 45.0766 92.2635C44.6224 92.2635 44.2544 91.8945 44.2544 91.4403C44.2546 90.9862 44.6226 90.618 45.0766 90.618ZM48.7583 90.2498C49.2151 90.2498 49.5853 90.6201 49.5854 91.077C49.5854 91.5339 49.2152 91.9041 48.7583 91.9041C48.3014 91.9041 47.9311 91.5339 47.9311 91.077C47.9312 90.6202 48.3014 90.2499 48.7583 90.2498Z"
                  fill="#F2DDA6"
                  fill-opacity="0.6"
                />
              </svg>
              <p class="body-12 body--reg">No matches</p>
            </div>
          </div>
        </template>
      </template>
    </ModalComponent>
  </Teleport>
</template>

<script setup>
import { ref, watch } from "vue";
import ModalComponent from "../modals/ModalComponent.vue";
import BaseButton from "../general/BaseButton.vue";
import { IconMessagePlus, IconSearch } from "@tabler/icons-vue";
import ChatButton from "../general/ChatButton.vue";
import { useChatsStore } from "../../stores/chats";

const isModalHide = ref(true);
const searchInput = ref("");
const isSearching = ref(false);
const results = ref(null);

const chatsStore = useChatsStore();

let searchTimeout = null;
const inputEvent = function () {
  isSearching.value = true;

  clearTimeout(searchTimeout);

  if (searchInput.value != "") {
    searchTimeout = setTimeout(() => {
      results.value = chatsStore.searchChats(searchInput.value);
      isSearching.value = false;
    }, 500);
  } else {
    isSearching.value = false;
    results.value = null;
  }
};

watch(isModalHide, (newValue, oldValue) => {
  if (newValue == true) {
    searchInput.value = "";
    isSearching.value = false;
    results.value = null;
  }
});

function displayDate(date) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  if (target.getTime() === today.getTime()) {
    return "Today";
  }

  if (target.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  const optionsCurrentYear = {
    day: "numeric",
    month: "short",
  };

  const optionsPastYear = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  if (target.getFullYear() === today.getFullYear()) {
    return date.toLocaleDateString("en-US", optionsCurrentYear);
  } else {
    return date.toLocaleDateString("en-US", optionsPastYear);
  }
}

function buttonClick(chatId) {
  chatsStore.openChat(chatId);
  isModalHide.value = true;
}
</script>

<style scoped>
.sidebar__search-button {
  width: 100%;
  gap: 0.5rem;
  color: var(--white-1000);
  padding: 0px 0.5rem;
  min-height: 2rem;
}

.popup .popup-search__new-chat-button {
  margin-bottom: 2rem;
}

.popup .popup-search__chats-group + .popup-search__chats-group {
  margin-top: 1rem;
}

.popup .popup-search__chats-group .group__title {
  display: block;
  padding: 0px 0.5rem;
  color: var(--white-500);
  margin-bottom: 0.375rem;
}

.popup .popup-search__placeholder {
  gap: 1.5rem;
}
.popup .popup-search__placeholder .placeholder__group {
  gap: 0.375rem;
}

.popup .popup-search__placeholder .placeholder__group > div {
  border-radius: 16px;
  background: var(--white-100, rgba(255, 255, 255, 0.1));
  height: 1rem;
}

.popup
  .popup-search__placeholder
  .placeholder__group
  > div.placeholder__rect--small {
  width: 4.8125rem;
}

.popup
  .popup-search__placeholder
  .placeholder__group
  > div.placeholder__rect--medium {
  width: 22rem;
}

.popup
  .popup-search__placeholder
  .placeholder__group
  > div.placeholder__rect--large {
  width: 25rem;
}

.popup .popup-search__results .popup-search__results-list {
  gap: 0.375rem;
}

.popup .popup-search__results .popup-search__results-list {
  gap: 0.375rem;
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat {
  min-height: 3.5rem;
  padding: 0px 0.5rem;
  gap: 1rem;
  transition: all 0.3s linear;
  border-radius: 0.5rem;
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat:hover,
.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat:focus {
  background: var(--white-50, rgba(255, 255, 255, 0.05));
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat
  .chat__name {
  flex: 1 1 auto;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat
  .chat__name
  .body-14 {
  margin-bottom: 0.5rem;
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat
  .chat__name
  .body-12 {
  color: var(--white-400, rgba(255, 255, 255, 0.4));
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat
  .chat__name
  :deep(.body-12 span) {
  color: var(--white-1000, #fff);
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat
  .chat__date {
  flex: 0 0 auto;
  display: none;
}

.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat:hover
  .chat__date,
.popup
  .popup-search__results
  .popup-search__results-list
  .popup-search__results-chat:focus
  .chat__date {
  display: block;
}

.popup .popup-search__results .popup-search__results--empty {
  padding: 0.875rem 0 1.5rem;
  gap: 0.375rem;
}

.popup .popup-search__results .popup-search__results--empty svg {
  width: 7.5rem;
  height: 7.5rem;
}

.popup .popup-search__results .popup-search__results--empty p {
  color: var(--white-400, rgba(255, 255, 255, 0.4));
}
</style>
