<template>
  <div class="solitaire">
    <Board />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Board from '@/components/Board.vue';
// import emptyColumn from '../../tests/fixtures/boards/emptyColumn.json';
// import aces from '../../tests/fixtures/decks/moveAcetoAces.json';

export default {
  name: 'Home',
  components: {
    Board,
  },
  mounted() {
    this.initGame();
    // this.$store.dispatch('setTestBoard', emptyColumn);
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
