<template>
  <Button @click="playNewGame" data-test="start-new-game-btn"> New </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'StartNewGameButton',
  components: {
    Button,
  },

  methods: {
    ...mapActions(['newGame']),
    playNewGame() {
      this.newGame();

      this.$router.replace('/');
    },
  },
};
</script>
