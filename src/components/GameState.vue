<template>
  <div>
    <div v-if="!hasMoves">
      <GameOverlay v-if="isGameWon" data-test="game-won">
        <template #title> Congratulations, you win! </template>
        <template #buttons>
          <NewGameButton completed />
        </template>
      </GameOverlay>

      <GameOverlay v-if="isGameLost" data-test="game-lost">
        <template #title> Sorry, no more Moves! </template>
        <template #buttons>
          <NewGameButton completed />
        </template>
      </GameOverlay>
    </div>

    <GamePaused v-if="hasMoves" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import GamePaused from '@/components/GamePaused.vue';
import NewGameButton from './NewGameButton.vue';

export default {
  name: 'GameState',
  components: {
    GameOverlay,
    GamePaused,
    NewGameButton,
  },
  computed: {
    ...mapGetters(['hasMoves', 'isGameWon', 'isGameLost']),
  },
};
</script>
