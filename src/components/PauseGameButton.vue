<template>
  <Button
    @click="pauseGame"
    :is-stacked="true"
    :disabled="isGameLoading"
    data-test="pause-game-btn"
  >
    Pause
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
    ...mapGetters(['isGameLoading']),
  },
  methods: {
    ...mapActions(['setGamePaused']),
    pauseGame() {
      this.setGamePaused(true);

      this.$router.push('/pause');
    },
  },
};
</script>
