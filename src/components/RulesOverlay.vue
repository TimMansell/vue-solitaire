<template>
  <GameOverlay :btn-close="toggleRules" data-test="rules-overlay">
    <template #title>
      How to play
    </template>
    <template #msg>
      <p>
        The aim of the game is to successfully move all cards from the bottom 8
        board columns to the top 4 foundation columns.
      </p>
      <h2>Face up cards</h2>
      <p>
        You can move any face up card to any other face up card providing:
      </p>
      <ul>
        <li>
          the card being moved to is exposed at the bottom of the column (no
          cards below it)
        </li>
        <li>the cards are the same suit and is one value lower</li>
        <li>both cards aren't on the same column</li>
      </ul>
      <p>For example, you can move 5♦ to 6♦ but <em>not</em> 8♦ to 7♦.</p>
      <p>Moving a card will also move all the cards below it.</p>
      <h2>Kings</h2>
      <p>
        If you clear out a column you can only move a <strong>K</strong> to fill
        that column. All cards below the <strong>K</strong> will also be moved
        to that column.
      </p>
      <h2>Foundation</h2>
      <p>
        Cards can only be moved to the foundation columns in the following
        order: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K.
      </p>
      <ul>
        <li>only one suit per column is allowed.</li>
        <li>
          you can only move an exposed card at the bottom of the column (no
          cards below it)
        </li>
      </ul>
      <h2>Moving cards</h2>
      <p>
        You can move cards by:
      </p>
      <ul data-test="rules-overlay-move-list">
        <li class="show-on-click">
          clicking and dragging the card(s) to the desired column
        </li>
        <li>
          clicking on the card you want to move and then clicking on the desired
          column. All cards below the selected card will be moved as well
        </li>
        <li>
          double <span class="show-on-click">clicking</span>
          <span class="show-on-touch">tapping or swiping up</span> on cards will
          move them to the foundation columns
        </li>
      </ul>
    </template>
  </GameOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import GameOverlay from '@/components/GameOverlay.vue';

export default {
  name: 'RulesOverlay',
  components: {
    GameOverlay,
  },
  methods: {
    ...mapActions(['toggleRules']),
  },
};
</script>

<style scoped lang="scss">
.show-on-touch {
  @media (hover: hover) and (pointer: fine) {
    display: none;
  }
}

.show-on-click {
  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
}
</style>
