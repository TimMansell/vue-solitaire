<template>
  <GameOverlay center-content show-logo v-if="isGameWon && !hasMoves" data-test="game-won">
    <template #title> Congratulations, you win! </template>
    <template #buttons>
      <NewGameButton completed />
    </template>
  </GameOverlay>
</template>

<script>
import { mapGetters } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';
import NewGameButton from './NewGameButton.vue';

export default {
  name: 'GameWon',
  components: {
    GameOverlay,
    NewGameButton,
  },
  computed: {
    ...mapGetters(['isGameWon', 'hasMoves']),
  },
};
</script>
