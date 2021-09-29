<template>
  <Button @click="resumeGame" data-test="resume-game-btn"> Resume </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'PauseGameButton',
  components: {
    Button,
  },
  methods: {
    ...mapActions(['setGamePaused']),
    resumeGame() {
      this.setGamePaused(false);

      this.$router.push('/');
    },
  },
};
</script>
