<template>
  <Button @click="togglePause" data-test="pause-game-btn">
    <span v-if="!isGamePaused.isPaused">Pause</span>
    <span v-if="isGamePaused.isPaused">Resume</span> Game
  </Button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'PauseGameButton',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['isGamePaused']),
  },
  methods: {
    ...mapActions(['setGamePaused']),
    togglePause() {
      const { isGamePaused } = this;

      const isPaused = {
        isPaused: !isGamePaused.isPaused,
        isActive: true,
        showMsg: true,
      };

      this.setGamePaused(isPaused);
    },
  },
};
</script>
