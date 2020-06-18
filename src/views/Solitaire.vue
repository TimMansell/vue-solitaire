<template>
  <div class="solitaire">
    <Board />
    <GameOverlay v-if="isGameWon" @buttonClick="setGameWon(false)" data-test="game-won">
      Congratulations, you win!
    </GameOverlay>
    <GameOverlay v-if="isGameLost" @buttonClick="setGameLost(false)" data-test="game-lost">
      Sorry, no more Moves!
    </GameOverlay>
    <Rules />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import GameOverlay from '@/components/GameOverlay.vue';
import Rules from '@/components/Rules.vue';
// import aces from '../../tests/fixtures/boards/noMovesKingColumn.json';

export default {
  name: 'Home',
  components: {
    Board,
    GameOverlay,
    Rules,
  },
  computed: {
    ...mapGetters(['isGameWon', 'isGameLost']),
  },
  mounted() {
    this.initGame();

    if (process.env.NODE_ENV === 'development') {
      // this.$store.dispatch('setTestBoard', aces);
    }
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
