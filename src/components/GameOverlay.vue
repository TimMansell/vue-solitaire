<template>
  <div class="game-overlay" data-test="game-overlay">
    <div class="game-overlay__content">
      <h1 class="game-overlay__title">
        <slot />
      </h1>
      <div class="game-overlay__btn" @click="buttonClick" data-test="game-overlay-btn">
        <NewGame />
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
  methods: {
    buttonClick() {
      this.$emit('buttonClick');
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  &__title {
    color: #fff;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
}
</style>
