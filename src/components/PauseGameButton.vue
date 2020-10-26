<template>
  <Button @click="togglePause" data-test="pause-game-btn">
    <span v-if="!paused">Pause</span>
    <span v-if="paused">Play</span> Game
  </Button>
</template>

<script>
import { mapActions } from 'vuex';
import Button from './Button.vue';

export default {
  name: 'PauseGameButton',
  components: {
    Button,
  },
  props: {
    paused: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions(['setGamePaused']),
    togglePause() {
      this.setGamePaused(false);

      this.$emit('toggle-pause');
    },
  },
};
</script>
