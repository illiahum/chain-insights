<template>
  <div :class="classes">
    <div class="tabs__list flex">
      <TabsButton v-for="(tab, index) in tabs" :text="tab" :key="index" />
    </div>

    <div class="tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TabsButton from "./TabsButton.vue";

const props = defineProps({
  tabs: {
    type: Array,
    default: null,
  },
  variant: {
    type: String,
    default: "variant-1",
  },
  orientation: {
    type: String,
    default: "vertical",
  },
  class: {
    type: String,
    default: "",
  },
});

const classes = computed(() => {
  let classesEl = `${props.class} tabs tabs--${props.orientation} tabs--${props.variant}`;

  return classesEl;
});
</script>

<style>
.tabs {
  display: flex;
  gap: 0.5rem;
}

.tabs.tabs--vertical {
  flex-direction: column;
  gap: 1.5rem;
}

.tabs .tabs__list {
  position: relative;
  display: flex;
  gap: 0.5rem;
  mask-image: linear-gradient(90deg, #fff 90%, rgba(255, 255, 255, 0) 100%);
  mask-mode: alpha;
  mask-repeat: no-repeat;
  mask-position: right top;
  max-width: 100%;
  overflow: hidden;
}
.tabs.tabs--horizontal .tabs__list {
  flex-direction: column;
  flex: 0 0 16.25rem;
}
.tabs .tabs__list .tabs__button {
  cursor: pointer;
}
.tabs.tabs--variant-1 > .tabs__list .tabs__button {
  flex-shrink: 0;
  padding: 0.875rem;
  border-radius: 16px;
  border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: var(--white-40, rgba(232, 233, 235, 0.04));
  backdrop-filter: blur(18.049999237060547px);
  transition: all 0.3s linear;
}

.tabs.tabs--variant-1 > .tabs__list .tabs__button:hover,
.tabs.tabs--variant-1 > .tabs__list .tabs__button:focus {
  border: 1px solid var(--gold-1000, #f2dda6);
  background: rgba(242, 221, 166, 0.1);
}

.tabs.tabs--variant-2 > .tabs__list .tabs__button {
  display: flex;
  align-items: center;

  height: 3.5rem;
  padding: 0.5rem 1.5rem;
  font-family: Inter;
  font-size: 0.875rem;
  font-style: normal;
  border-left: 1px solid transparent;
  font-weight: 500;
  line-height: 120%;
  transition: all 0.3s linear;
}

.tabs.tabs--variant-2 > .tabs__list .tabs__button:hover,
.tabs.tabs--variant-2 > .tabs__list .tabs__button:focus {
  border-left-color: var(--gold-1000, #f2dda6);
}

.tabs .tabs__content {
  width: 100%;
}

.tabs.tabs--horizontal .tabs__content {
  flex: 1 1 100%;
}

@media screen and (max-width: 767px) {
  .tabs {
    display: flex;
    gap: 0.5rem;
  }

  .tabs.tabs--horizontal {
    flex-direction: column;
    gap: 2rem;
  }

  .tabs.tabs--vertical {
    flex-direction: column;
    gap: 1.5rem;
  }

  .tabs .tabs__list {
    position: relative;
    display: flex;
    gap: 0.5rem;
    max-width: 100%;
    overflow: hidden;
  }
  .tabs.tabs--horizontal .tabs__list {
    flex-direction: row;
    flex: 0 0 auto;
  }
  .tabs.tabs--variant-1 > .tabs__list .tabs__button {
    flex-shrink: 0;
    padding: 0.875rem;
    border-radius: 16px;
    border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
    background: var(--white-40, rgba(232, 233, 235, 0.04));
    backdrop-filter: blur(18.049999237060547px);
    transition: all 0.3s linear;
  }

  .tabs.tabs--variant-1 > .tabs__list .tabs__button:hover,
  .tabs.tabs--variant-1 > .tabs__list .tabs__button:focus {
    border: 1px solid var(--gold-1000, #f2dda6);
    background: rgba(242, 221, 166, 0.1);
  }

  .tabs.tabs--variant-2 > .tabs__list {
    gap: 0px;
    border-bottom: 1px solid var(--white-50, rgba(255, 255, 255, 0.05));
    mask-image: none;
  }

  .tabs.tabs--variant-2 > .tabs__list .tabs__button {
    flex: 0 0 auto;

    display: flex;
    align-items: center;

    height: 2.5rem;

    border-left: none;
    border-bottom: 1px solid transparent;
  }

  .tabs.tabs--variant-2 > .tabs__list .tabs__button:hover,
  .tabs.tabs--variant-2 > .tabs__list .tabs__button:focus {
    border-bottom-color: var(--gold-1000, #f2dda6);
  }

  .tabs .tabs__content {
    width: 100%;
  }

  .tabs.tabs--horizontal .tabs__content {
    flex: 1 1 100%;
  }
}
</style>
