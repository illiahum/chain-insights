<template>
  <div :class="mainClasses">
    <div class="bar__content flex align--center">
      <div class="bar__icon">
        <AtomIcon />
      </div>
      <div class="bar__data flex flex--column justify--between">
        <p class="body-14 body--reg">5/30 credits</p>
        <div class="bar__line">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="49"
            height="4"
            viewBox="0 0 49 4"
            fill="none"
            preserve-aspect-ratio="none"
          >
            <rect width="49" height="4" rx="2" fill="#F2DDA6" />
            <rect
              width="49"
              height="4"
              rx="2"
              fill="url(#pattern0_16548_5246)"
              fill-opacity="0.2"
            />
            <defs>
              <pattern
                id="pattern0_16548_5246"
                patternUnits="userSpaceOnUse"
                patternTransform="matrix(165.6 0 0 60.2 0 0)"
                preserveAspectRatio="none"
                viewBox="0 0 828 301"
                width="1"
                height="1"
              >
                <g id="pattern0_16548_5246_inner">
                  <g clip-path="url(#clip0_16548_5246)">
                    <rect
                      x="169.298"
                      y="-82"
                      width="64"
                      height="593"
                      transform="rotate(45 169.298 -82)"
                      fill="#171718"
                    />
                    <rect
                      x="333.867"
                      y="-82"
                      width="64"
                      height="593"
                      transform="rotate(45 333.867 -82)"
                      fill="#171718"
                    />
                    <rect
                      x="498.436"
                      y="-82"
                      width="64"
                      height="593"
                      transform="rotate(45 498.436 -82)"
                      fill="#171718"
                    />
                    <rect
                      x="663.005"
                      y="-82"
                      width="64"
                      height="593"
                      transform="rotate(45 663.005 -82)"
                      fill="#171718"
                    />
                    <rect
                      x="827.574"
                      y="-82"
                      width="64"
                      height="593"
                      transform="rotate(45 827.574 -82)"
                      fill="#171718"
                    />
                    <rect
                      x="992.143"
                      y="-82"
                      width="64"
                      height="593"
                      transform="rotate(45 992.143 -82)"
                      fill="#171718"
                    />
                    <rect
                      x="1156.71"
                      y="-82"
                      width="64"
                      height="593"
                      transform="rotate(45 1156.71 -82)"
                      fill="#171718"
                    />
                  </g>
                </g>
              </pattern>
              <clipPath id="clip0_16548_5246">
                <rect width="828" height="301" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <BaseButton text="Buy credits" size="m" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import BaseButton from "./BaseButton.vue";
import AtomIcon from "../icons/AtomIcon.vue";

const props = defineProps({
  class: String,
});

const mainClasses = computed(() => {
  return `credits-bar flex ${props.class}`;
});
</script>

<style scoped>
.credits-bar {
  gap: 1.5rem;
}

.credits-bar .bar__content {
  flex: 1 1 auto;
  gap: 0.5rem;
}

.credits-bar .bar__icon {
  padding: 0.46875rem;
  border-radius: 100%;
  border: 0.5px solid var(--white-100, rgba(255, 255, 255, 0.1));
  background: var(--sidebar, #131318);
}

.credits-bar .bar__icon svg {
  width: 1.5625rem;
  height: 1.5625rem;
  display: block;
}

.credits-bar .bar__data {
  flex: 1 1 auto;
  height: 2rem;
}

.credits-bar .bar__data .bar__line {
  width: 100%;
  height: 0.25rem;
  position: relative;
  border-radius: 6px;
  background: var(--white-100, rgba(255, 255, 255, 0.1));
}

.credits-bar .bar__data .bar__line svg {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}
</style>
