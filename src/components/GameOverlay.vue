<template>
  <div class="game-overlay" :class="classes" data-test="game-overlay">
    <div class="game-overlay__content">
      <h1 class="game-overlay__title">
        <slot name="title" />
      </h1>
      <div class="game-overlay__btn" data-test="game-overlay-btn">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameOverlay',
  props: {
    alt: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const { alt } = this;

      return {
        'game-overlay--alt': alt,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.game-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba($col-tertiary, 0.7);
  z-index: var(--z-overlay);

  &--alt {
    background: var(--bg-primary) url('~@/assets/felt.png') repeat;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--pd-lg);
  }

  &__title {
    color: var(--text-primary);
    text-shadow: -1px -1px rgba($col-tertiary, 0.3);
    text-align: center;
  }
}
</style>
