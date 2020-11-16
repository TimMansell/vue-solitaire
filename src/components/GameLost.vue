<template>
  <GameOverlay center-content show-logo data-test="game-lost">
    <template #title> Sorry, no more Moves! </template>
    <template #buttons>
      <NewGameButton completed />
    </template>
  </GameOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import NewGameButton from './NewGameButton.vue';

export default {
  name: 'GameLost',
  components: {
    GameOverlay,
    NewGameButton,
  },
  mounted() {
    this.setGamePaused();
  },
  methods: {
    ...mapActions(['setGamePaused']),
  },
};
</script>
