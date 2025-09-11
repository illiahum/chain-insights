<template>
  <button class="sidebar__search-button flex align--center">
    <SearchIcon /> Search in History
  </button>
</template>

<script>
import SearchIcon from "../icons/SearchIcon.vue";

export default {
  name: "SideBar",
  components: {
    SearchIcon,
  },
};
</script>

<style scoped>
.sidebar__search-button {
  width: 100%;
  gap: 0.5rem;
  color: var(--white-1000);
  padding: 0px 0.5rem;
  min-height: 2rem;
}
</style>
