<template>
  <Button @click="continueGame" data-test="continue-game-btn">
    Continue
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
  methods: {
    ...mapActions(['setGamePaused']),
    continueGame() {
      this.setGamePaused(false);

      this.$router.push('/');
    },
  },
};
</script>
