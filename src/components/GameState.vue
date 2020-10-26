<template>
  <div v-if="!hasMoves">
    <GameOverlay v-if="isGameWon" data-test="game-won">
      <template #title> Congratulations, you win! </template>
      <template #buttons>
        <NewGame completed />
      </template>
    </GameOverlay>

    <GameOverlay v-if="isGameLost" data-test="game-lost">
      <template #title> Sorry, no more Moves! </template>
      <template #buttons>
        <NewGame completed />
      </template>
    </GameOverlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import NewGame from './NewGame.vue';

export default {
  name: 'GameState',
  components: {
    GameOverlay,
    NewGame,
  },
  computed: {
    ...mapGetters(['hasMoves', 'isGameWon', 'isGameLost']),
  },
};
</script>
