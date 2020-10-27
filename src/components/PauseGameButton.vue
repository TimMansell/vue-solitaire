<template>
  <Button @click="togglePause" data-test="pause-game-btn">
    <span v-if="!isGamePaused.paused">Pause</span>
    <span v-if="isGamePaused.paused">Resume</span> Game
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

      const paused = {
        paused: !isGamePaused.paused,
        active: true,
      };

      this.setGamePaused(paused);
    },
  },
};
</script>
