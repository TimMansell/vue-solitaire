<template>
  <Button
    :is-stacked="isStacked"
    @click="playNewGame"
    :disabled="isGameLoading"
    data-test="new-game-btn"
  >
    New
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },
  props: {
    isCompleted: {
      type: Boolean,
      default: false,
    },
    showConfirmation: {
      type: Boolean,
      default: false,
    },
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['isGameLoading']),
  },
  methods: {
    ...mapActions(['newGame', 'toggleNewGame']),
    playNewGame() {
      const { isCompleted, showConfirmation } = this;

      if (showConfirmation) {
        this.toggleNewGame();

        return;
      }

      this.newGame(isCompleted);
    },
  },
};
</script>
