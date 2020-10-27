<template>
  <Button @click="togglePause" data-test="pause-game-btn">
    <span v-if="!isGamePaused">Pause</span>
    <span v-if="isGamePaused">Resume</span> Game
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
  props: {
    paused: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['isGamePaused']),
  },
  methods: {
    ...mapActions(['setGamePaused']),
    togglePause() {
      const { isGamePaused } = this;

      this.setGamePaused(!isGamePaused);
    },
  },
};
</script>
