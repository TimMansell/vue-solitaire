<template>
  <div>
    <div class="rules">
      <button @click="toggleRules" data-test="game-rules">
        How to play
      </button>
    </div>

    <Modal>
      <h1>How to play</h1>
      <p>
        The aim of the game is to successfully move all cards from the bottom 8 board columns to the
        top 4 foundation columns.
      </p>
      <h2>Rules</h2>
      <h3>Face up cards</h3>
      <p>
        You can move any face up card to any other face up card providing:
      </p>
      <ul>
        <li>
          the card being moved to is exposed at the bottom of the column (no cards below it)
        </li>
        <li>the cards are the same suit and is one value lower</li>
        <li>both cards aren't on the same column</li>
      </ul>
      <p>For example, you can move 5♦ to 6♦ but <em>not</em> 8♦ to 7♦.</p>
      <p>Moving a card will also move all the cards below it.</p>
      <h3>Kings</h3>
      <p>
        If you clear out a column you can only move a <strong>K</strong> to fill that column. All
        cards below the <strong>K</strong> will also be moved to that column.
      </p>
      <h3>Foundation</h3>
      <p>
        Cards can only be moved to the foundation columns in the following order: A, 2, 3, 4, 5, 6,
        7, 8, 9, 10, J, Q, K.
      </p>
      <ul>
        <li>only one suit per column is allowed.</li>
        <li>you can only move an exposed card at the bottom of the column (no cards below it)</li>
      </ul>
      <h2>Moving cards</h2>
      <p>
        You can move cards by:
      </p>
      <ul>
        <li class="display-on--click">clicking and dragging the card(s) to the desired column</li>
        <li>
          clicking on the card you want to move and then clicking on the desired column. All cards
          below the selected card will be moved as well
        </li>
        <li>
          double
          <span class="display-on--touch">tapping</span>
          <span class="display-on--click">clicking</span>
          cards will move them to the foundation columns
        </li>
      </ul>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  name: 'Controls',
  components: {
    Modal,
  },
  data() {
    return {
      modalIsVisible: false,
    };
  },
  methods: {
    toggleRules() {
      this.$modal.show('modal');
    },
  },
};
</script>

<style lang="scss" scoped>
.display-on {
  &--touch {
    @media (hover: hover) and (pointer: fine) {
      display: none;
    }
  }

  &--click {
    @media (hover: none) and (pointer: coarse) {
      display: none;
    }
  }
}
</style>
