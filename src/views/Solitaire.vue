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
// import emptyColumn from '../../tests/fixtures/boards/emptyColumn.json';
// import emptyColumn from '../../tests/fixtures/boards/emptyBoard.json';
// import emptyColumn from '../../tests/fixtures/boards/moveAcetoAces.json';
// import foundations from '../../tests/fixtures/foundations/fullFoundation.json';
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
    // this.$store.dispatch('setTestFoundation', aces.foundations);
    // this.$store.dispatch('dealTestCards', aces);
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
