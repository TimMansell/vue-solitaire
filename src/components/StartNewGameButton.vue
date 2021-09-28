<template>
  <Button @click="playNewGame" data-test="new-game-btn"> New </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'NewGame',
  components: {
    Button,
  },

  methods: {
    ...mapActions(['newGame']),
    playNewGame() {
      this.newGame();

      this.$router.push('/');
    },
  },
};
</script>
