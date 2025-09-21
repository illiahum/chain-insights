<template>
  <div class="chat__network-chart-legend">
    <div class="legend__top">
      <div class="legend__label">
        <IconList />
        Legend
      </div>
      <div>Collapse <IconChevronUp /></div>
    </div>
    <div class="legend__content flex flex--column">
      <div class="legend__group">
        <p class="body-12 body--reg">Colors</p>
        <ul>
          <li v-for="(index, color) in colors" :key="index">
            <span :style="`background-color: ${color.hex}`"></span>
            {{ color.name }}
          </li>
        </ul>
      </div>
      <div class="legend__group">
        <p class="body-12 body--reg">Node Size</p>
        <ul class="body-12 body--reg">
          <li v-for="(index, size) in sizes" :key="index">
            <span class="body--semi">{{ size.name }}</span>
            {{ size.text }}
          </li>
        </ul>
      </div>
      <div class="legend__group">
        <p class="body-12 body--reg">Edges</p>
        <ul class="body-12 body--reg">
          <li v-for="(index, edge) in edges" :key="index">
            <span class="body--semi">{{ edge.name }}</span>
            {{ edge.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconChevronUp, IconList } from "@tabler/icons-vue";

const props = defineProps({
  colors: Array,
  sizes: Array,
  edges: Array,
});
</script>
