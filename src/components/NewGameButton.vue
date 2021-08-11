<template>
  <Button :is-stacked="isStacked" @click="newGame" data-test="new-game-btn">
    New
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
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
  methods: {
    ...mapActions(['restartApp', 'toggleNewGame']),
    newGame() {
      const { isCompleted, showConfirmation } = this;

      if (showConfirmation) {
        this.toggleNewGame();

        return;
      }

      this.restartApp(isCompleted);
    },
  },
};
</script>
