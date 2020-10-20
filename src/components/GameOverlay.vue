<template>
  <div class="game-overlay" data-test="game-overlay">
    <div class="game-overlay__content">
      <h1 class="game-overlay__title">
        <slot />
      </h1>
      <div class="game-overlay__btn" data-test="game-overlay-btn">
        <NewGame completed />
      </div>
    </div>
  </div>
</template>

<script>
import NewGame from '@/components/NewGame.vue';

export default {
  name: 'GameOverlay',
  components: {
    NewGame,
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
