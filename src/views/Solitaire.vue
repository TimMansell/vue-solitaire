<template>
  <div class="solitaire">
    <Board />
    <div v-if="isGameWon">
      <Winner />
    </div>
    <div v-if="isGameLost">
      <GameOverlay />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import Winner from '@/components/Winner.vue';
import GameOverlay from '@/components/GameOverlay.vue';

export default {
  name: 'Home',
  components: {
    Board,
    Winner,
    GameOverlay,
  },
  data() {
    return {
      gameWon: true,
    };
  },
  computed: {
    ...mapGetters(['isGameWon', 'isGameLost']),
  },
  mounted() {
    this.initGame();
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
  padding: 0.5rem 0;
}
</style>
