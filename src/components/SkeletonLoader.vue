<template>
  <span class="skeleteon">
    <span class="skeleteon__bar" />
  </span>
</template>

<script>
export default {
  name: 'Skeleteon',
};
</script>

<style scoped lang="scss">
.skeleteon {
  display: flex;

  &__bar {
    flex: 1;
    height: var(--vr);
    border-radius: var(--bdr-radius-lg);

    /* stylelint-disable */

    background-image: linear-gradient(
      90deg,
      var(--bg-tertiary-alt) 0,
      var(--bg-tertiary-alt-2) 40px,
      var(--bg-tertiary-alt) 100px
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
