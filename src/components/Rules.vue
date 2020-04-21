<template>
  <div>
    <div class="rules">
      <button class="rules__btn" @click="toggleRules" data-test="new-game">
        How to play
      </button>
    </div>
    <div class="rules-modal">
      <div class="rules-modal__container">
        <h1>How to play</h1>
        <p>
          The aim of the game is to successfully move all cards from the bottom 8 board columns to
          the top 4 foundation columns.
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
          Cards can only be moved to the foundation columns in the following order: A, 2, 3, 4, 5,
          6, 7, 8, 9, 10, J, Q, K.
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
          <li>clicking and dragging the card(s) to the desired column</li>
          <li>
            clicking on the card you want to move and then clicking on the desired column. All cards
            below the selected card will be moved as well
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  methods: {
    toggleRules() {
      // this.$store.dispatch('toggleRules');
      // this.$store.dispatch('initGame');
    },
  },
};
</script>

<style lang="scss" scoped>
.rules {
  position: fixed;
  right: 0.5rem;
  top: 2.5rem;

  &__btn {
    font-size: 1rem;
  }
}

.rules-modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  z-index: 100;

  &__container {
    align-self: center;
    background: white;
    padding: 1rem;
    width: 50%;
    border-radius: 0.5rem;
  }
}
</style>
