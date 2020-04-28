<template>
  <div class="solitaire">
    <Board />
    <div v-if="isGameWon">
      <Winner />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Board from '@/components/Board.vue';
import Winner from '@/components/Winner.vue';
// import aces from '../../tests/fixtures/boards/doubleClickAce1.json';

export default {
  name: 'Home',
  components: {
    Board,
    Winner,
  },
  data() {
    return {
      gameWon: true,
    };
  },
  computed: {
    ...mapGetters(['isGameWon']),
  },
  mounted() {
    this.initGame();
    // this.$store.dispatch('setTestBoard', aces);
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
