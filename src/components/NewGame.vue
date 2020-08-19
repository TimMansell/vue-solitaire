<template>
  <Button @click="newGame" data-test="new-game-btn">
    New Game
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
    completed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('db', ['game']),
  },
  methods: {
    ...mapActions(['restartGame', 'initGame']),
    newGame() {
      const { completed } = this;

      this.restartGame(completed);
      this.initGame();

      this.$gtag.event('New Game', { event_category: 'Buttons' });
    },
  },
};
</script>
