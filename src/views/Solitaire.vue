<template>
  <div class="solitaire">
    <Board />
    <GameOverlay v-if="isGameWon" @buttonClick="setGameWon(false)" data-test="game-won">
      Congratulations, you win!
    </GameOverlay>
    <GameOverlay v-if="isGameLost" @buttonClick="setGameLost(false)" data-test="game-lost">
      Sorry, no more Moves!
    </GameOverlay>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import GameOverlay from '@/components/GameOverlay.vue';

export default {
  name: 'Home',
  components: {
    Board,
    GameOverlay,
  },
  computed: {
    ...mapGetters(['isGameWon', 'isGameLost']),
  },
  mounted() {
    this.initGame();
  },
  methods: {
    ...mapActions(['initGame', 'setGameWon', 'setGameLost']),
  },
};
</script>

<style scoped lang="scss">
.solitaire {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
}
</style>
