<template>
  <div
    class="chat__network-chart-legend"
    :class="{
      'chat__network-chart-legend--open': isOpen,
    }"
  >
    <div
      class="legend__top flex justify--between align--center"
      @click="isOpen = !isOpen"
    >
      <div class="legend__label flex align--center gap--8">
        <IconList class="icon icon--16" />
        Legend
      </div>
      <div
        class="flex justify--between align--center body-12 body--reg color--white-400"
        v-if="isOpen"
      >
        Collapse <IconChevronUp class="icon icon--16 icon--white--400" />
      </div>
    </div>
    <div class="legend__content flex flex--column" v-if="isOpen">
      <div class="legend__group">
        <p class="body-12 body--reg color--white-400">Colors</p>
        <ul>
          <li
            v-for="(color, colorName) in colors"
            :key="color"
            class="body-12 body--reg"
          >
            <span
              :style="`background-color: ${colorsTypes[color]}`"
              class="legend__square"
            ></span>
            {{ colorName }}
          </li>
        </ul>
      </div>
      <div class="legend__group">
        <p class="body-12 body--reg color--white-400">Node Size</p>
        <ul class="body-12 body--reg">
          <li v-for="(size, index) in sizes" :key="index">
            <span class="body--semi">{{ size.name }}</span>
            {{ size.value }}
          </li>
        </ul>
      </div>
      <div class="legend__group">
        <p class="body-12 body--reg color--white-400">Edges</p>
        <ul class="body-12 body--reg">
          <li v-for="(edge, index) in edges" :key="index">
            <span class="body--semi">{{ edge.name }}</span>
            {{ edge.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconChevronUp, IconList } from "@tabler/icons-vue";
import { ref } from "vue";

const colorsTypes = {
  gold: "#AE9D71",
  peach: "#AE7171",
  salad: "#86AE71",
  sky: "#71AEA7",
  lavanda: "#717BAE",
  pink: "#9E71AE",
};

const isOpen = ref(false);

const props = defineProps({
  colors: Array,
  sizes: Array,
  edges: Array,
});
</script>

<style scoped>
.chat__network-chart-legend {
  border-radius: 0.75rem;
  border: 1px solid var(--white-200, rgba(255, 255, 255, 0.2));
  background: var(--white-100, rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(3.25rem);
  padding: 0px 1rem;
}

/* .chat__network-chart-legend.chat__network-chart-legend--open {
  padding: 1rem;
} */

.chat__network-chart-legend .legend__top {
  cursor: pointer;
  min-height: 2.5rem;
}

.chat__network-chart-legend .legend__top .legend__label {
  font-size: 0.875rem;
}

.chat__network-chart-legend .legend__content {
  padding-top: 1rem;
  border-top: 1px solid var(--white-100, rgba(255, 255, 255, 0.1));
  gap: 1rem;
  padding-bottom: 1rem;
}

.chat__network-chart-legend .legend__content .legend__group p {
  margin-bottom: 0.5rem;
}

.chat__network-chart-legend .legend__content .legend__group ul {
  list-style: none;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chat__network-chart-legend .legend__content .legend__group ul .legend__square {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 2px;
  margin-right: 0.5rem;
}
</style>
