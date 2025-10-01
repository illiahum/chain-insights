<template>
  <div :class="classes">
    <Swiper class="tabs__list flex" slides-per-view="auto" space-between="8">
      <SwiperSlide v-for="(tab, index) in tabs" :key="index">
        <TabsButton
          :text="tab.title"
          @click="selectTab(tab)"
          :isActive="tab.isActive"
        />
      </SwiperSlide>
    </Swiper>

    <div class="tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, ref } from "vue";
import TabsButton from "./TabsButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps({
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

const tabs = ref([]);

const addTab = (tab) => {
  tabs.value.push(tab);
};

const selectTab = (selectedTab) => {
  tabs.value.forEach((tab) => {
    tab.isActive = tab === selectedTab;
  });
};

provide("addTab", addTab);
provide("selectTab", selectTab);

const classes = computed(() => {
  let classesEl = `${props.class} tabs tabs--${props.orientation} tabs--${props.variant}`;

  return classesEl;
});

onMounted(() => {
  if (tabs.value.length > 0) {
    selectTab(tabs.value[0]);
  }
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
.tabs .tabs__list .swiper-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.tabs.tabs--horizontal .tabs__list .swiper-wrapper {
  flex-direction: column;
  flex: 0 0 16.25rem;
}
.tabs .tabs__list .swiper-wrapper .swiper-slide {
  flex: 0 0 auto;
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
.tabs.tabs--variant-1 > .tabs__list .tabs__button:focus,
.tabs.tabs--variant-1 > .tabs__list .tabs__button.tabs__button--active {
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
.tabs.tabs--variant-2 > .tabs__list .tabs__button:focus,
.tabs.tabs--variant-2 > .tabs__list .tabs__button.tabs__button--active {
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
    max-width: 100%;
    overflow: hidden;
  }

  .tabs.tabs--horizontal .tabs__list {
    flex: 0 0 auto;
  }

  .tabs.tabs--horizontal .tabs__list .swiper-wrapper {
    flex-direction: row;
    flex: 0 0 auto;
  }

  .tabs.tabs--variant-2 > .tabs__list .tabs__button {
    flex: 0 0 auto;

    border-left: none;
    border-bottom: 1px solid transparent;
  }

  .tabs.tabs--variant-2 > .tabs__list .tabs__button:hover,
  .tabs.tabs--variant-2 > .tabs__list .tabs__button:focus,
  .tabs.tabs--variant-2 > .tabs__list .tabs__button.tabs__button--active {
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
