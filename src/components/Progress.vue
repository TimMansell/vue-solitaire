<template>
  <span class="progress">
    <span class="progress__bar" />
  </span>
</template>

<script>
export default {
  name: 'Progress',
};
</script>

<style scoped lang="scss">
.progress {
  display: flex;

  &__bar {
    flex: 1;
    height: var(--vr);
    border-radius: var(--bdr-radius-lg);

    /* stylelint-disable */

    background-image: linear-gradient(
      90deg,
      var(--col-secondary-alt) 0,
      var(--col-secondary-alt-2) 40px,
      var(--col-secondary-alt) 100px
    );

    /* stylelint-enable */

    background-size: 200%;

    @media screen and (prefers-reduced-motion: no-preference) {
      animation: animate-bar 1.5s infinite linear;
    }
  }
}

@keyframes animate-bar {
  0% {
    background-position: 100%;
  }

  40%,
  100% {
    background-position: -100%;
  }
}
</style>
