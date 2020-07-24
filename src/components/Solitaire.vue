<template>
  <div class="solitaire">
    <Board />
    <GameOverlay v-if="!hasMoves && isGameWon" data-test="game-won">
      Congratulations, you win!
    </GameOverlay>
    <GameOverlay v-if="!hasMoves && !isGameWon" data-test="game-lost">
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
// import aces from '../../tests/fixtures/boards/doubleClickAce1.json';

export default {
  name: 'Home',
  components: {
    Board,
    GameOverlay,
    Rules,
  },
  computed: {
    ...mapGetters(['isGameWon', 'hasMoves']),
  },
  mounted() {
    this.initGame();

    if (process.env.NODE_ENV === 'development') {
      // this.$store.dispatch('setBoardAndFoundation', aces);
    }
  },
  methods: {
    ...mapActions(['initGame']),
  },
};
</script>

<style scoped lang="scss">
.solitaire {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;
}
</style>
