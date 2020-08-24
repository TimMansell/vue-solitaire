<template>
  <div class="solitaire">
    <Board />
    <GameOverlay v-if="!hasMoves">
      <div v-if="isGameWon" data-test="game-won">Congratulations, you win!</div>
      <div v-if="isGameLost" data-test="game-lost">Sorry, no more Moves!</div>
    </GameOverlay>
    <Rules />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import GameOverlay from '@/components/GameOverlay.vue';
import Rules from '@/components/Rules.vue';
// import aces from '../../tests/fixtures/boards/fullFoundation.json';

export default {
  name: 'Home',
  components: {
    Board,
    GameOverlay,
    Rules,
  },
  computed: {
    ...mapGetters(['hasMoves', 'isGameWon', 'isGameLost']),
  },
  async created() {
    await this.initUser();

    this.initGame();

    // Force cypress to wait until async functions have loaded.
    if (window.Cypress) {
      window.appReady = true;
    }

    this.gameTimer = this.initGameTimer();

    document.addEventListener('visibilitychange', this.toggleGameTimer, false);

    // if (process.env.NODE_ENV === 'development') {
    //   this.setBoardAndFoundation(aces);
    // }
  },
  methods: {
    ...mapActions(['initUser', 'initGame', 'updateTimer', 'setBoardAndFoundation']),
    initGameTimer() {
      return window.setInterval(() => this.updateTimer(), 1000);
    },
    toggleGameTimer() {
      if (document.visibilityState === 'visible') {
        this.gameTimer = this.initGameTimer();
      } else {
        clearInterval(this.gameTimer);
      }
    },
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
