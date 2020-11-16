<template>
  <GameOverlay center-content show-logo v-if="isGameLost && !hasMoves" data-test="game-lost">
    <template #title> Sorry, no more Moves! </template>
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
  name: 'GameLost',
  components: {
    GameOverlay,
    NewGameButton,
  },
  computed: {
    ...mapGetters(['isGameLost', 'hasMoves']),
  },
};
</script>
