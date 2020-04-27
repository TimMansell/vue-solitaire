<template>
  <div class="winner" data-test="game-overlay">
    <div class="winner__content">
      <h1 class="winner__title">Sorry, no more Moves!</h1>
      <div class="winner__btn" @click="setGameLost(false)" data-test="game-overlay-btn">
        <NewGame />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NewGame from '@/components/NewGame.vue';

export default {
  name: 'GameOverlay',
  components: {
    NewGame,
  },
  methods: {
    ...mapActions(['setGameLost']),
  },
};
</script>

<style lang="scss" scoped>
.winner {
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
    color: white;
    text-shadow: -1px -1px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
}
</style>
