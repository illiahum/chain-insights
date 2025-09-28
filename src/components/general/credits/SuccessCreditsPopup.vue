<template>
  <ModalComponent
    :is_hide="is_hide"
    @close-popup="$emit('closePopup')"
    size="small"
    class="popup-success-credits"
  >
    <template #head> Success </template>

    <template #content>
      <div class="popup__row popup__row--balance popup__group">
        <div class="group__row flex align--center justify--between mb--24">
          <p class="body-14 body--reg">Your Current Credit Balance</p>
          <p class="body-14 body--reg">300/300 credits</p>
        </div>
        <div class="group__row">
          <CreditBarLine :credits="300" :max="300" />
        </div>
      </div>
      <div class="popup__row">
        <p class="body-14 body--reg color--white-600">
          Your credits have been successfully purchased.<br />You now have
          <span class="color--white-1000">300 credits</span> available to use
          for all your queries and analyses. Start exploring deeper insights and
          visualizations or perform detailed research right away!<br />Happy
          exploring!
        </p>
      </div>
      <BaseButton
        text="Go to chat"
        size="l"
        type="secondary"
        :full-width="true"
        @click="() => $emit('closePopup')"
      />
    </template>

    <template #background>
      <canvas ref="backgroundConfetti" class="popup-success-confetti"> </canvas>
    </template>
  </ModalComponent>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ModalComponent from "../../modals/ModalComponent.vue";
import BaseButton from "../BaseButton.vue";
import CreditBarLine from "../CreditBarLine.vue";

const backgroundConfetti = ref(null);

function setupConfettiCanvas() {
  const canvas = backgroundConfetti.value;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  return { canvas, ctx };
}

function renderConfetti() {
  let paths = [
    new Path2D(
      "M10.91 0.44841C4.99131 3.67498 3.0691 8.18938 0.398428 15.0773C3.73174 21.4069 5.57058 26.5528 9.07341 31.3774C16.5231 29.5337 21.8956 29.9597 30.4644 34.416C25.3293 19.5418 20.3565 12.0161 10.91 0.44841Z"
    ),
    new Path2D(
      "M7.55231 20.2249C15.5022 15.3716 20.5294 13.2393 29.7387 11.282C28.8518 6.7604 27.299 3.05408 24.1606 0.119302C17.8551 0.830915 10.4217 3.40817 0.808149 7.79878C6.15176 11.9632 8.20422 14.9501 7.55231 20.2249Z"
    ),
  ];
  let colors = [
    "rgba(242, 221, 166, 1)",
    "rgba(242, 221, 166, 0.80)",
    "rgba(242, 221, 166, 0.60)",
    "rgba(242, 221, 166, 0.40)",
    "rgba(242, 221, 166, 0.20)",
  ];

  const confetti = [];
  const start = performance.now();

  const { canvas, ctx } = setupConfettiCanvas();

  for (let i = 0; i < 60; i++) {
    const radius = Math.floor(Math.random() * 50) - 10;
    const tilt = Math.floor(Math.random() * 10) - 10;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    confetti.push({
      x,
      y,
      radius,
      tilt,
      path: paths[Math.floor(Math.random() * paths.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * Math.PI * 2,
      yVelocity: 1 + Math.random() * 3,
      xVelocity: Math.random() * 2 - 1,
    });
  }

  function update() {
    if (performance.now() - start > 20000) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((piece) => {
      piece.y += piece.yVelocity;
      piece.x += piece.xVelocity;

      ctx.save();

      ctx.translate(piece.x + piece.tilt + piece.radius, piece.y);
      ctx.rotate(piece.rotate);
      ctx.fillStyle = piece.color;
      ctx.fill(piece.path);

      ctx.restore();
    });

    requestAnimationFrame(update);
  }

  update();
}

onMounted(() => {
  renderConfetti();
});
</script>

<style scoped>
.popup-success-confetti {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
}
</style>
